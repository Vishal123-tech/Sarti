const typingForm = document.querySelector(".typing-form");
const chatContainer = document.querySelector(".chat-list");
const suggestions = document.querySelectorAll(".suggestion");
const toggleThemeButton = document.querySelector("#theme-toggle-button");
const deleteChatButton = document.querySelector("#delete-chat-button");

// State variables
let userMessage = null;
let isResponseGenerating = false;

// API configuration
const API_KEY = "AIzaSyBAcAqPJ0c3tOczXCfi96idkqiz3ubNayk";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

// Load theme and chat data from local storage on page load
const loadDataFromLocalstorage = () => {
  const isLightMode = localStorage.getItem("themeColor") === "light_mode";
  const savedChats = localStorage.getItem("saved-chats");

  // Apply the stored theme
  document.body.classList.toggle("light_mode", isLightMode);
  toggleThemeButton.innerText = isLightMode ? "dark_mode" : "light_mode";

  // Restore saved chats or clear the chat container
  chatContainer.innerHTML = savedChats || "";
  document.body.classList.toggle("hide-header", savedChats);

  if (savedChats) {
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
  }
};

// Create a new message element and return it
const createMessageElement = (content, ...classes) => {
  const div = document.createElement("div");
  div.classList.add("message", ...classes);
  div.innerHTML = content;
  return div;
};

// Show typing effect by displaying words one by one
const showTypingEffect = (text, textElement, incomingMessageDiv) => {
  const words = text.split(" ");
  let currentWordIndex = 0;

  const typingInterval = setInterval(() => {
    // Append each word to the text element with a space
    textElement.innerText +=
      (currentWordIndex === 0 ? "" : " ") + words[currentWordIndex++];
    incomingMessageDiv.querySelector(".icon").classList.add("hide");

    // If all words are displayed
    if (currentWordIndex === words.length) {
      clearInterval(typingInterval);
      isResponseGenerating = false;
      incomingMessageDiv.querySelector(".icon").classList.remove("hide");
      localStorage.setItem("saved-chats", chatContainer.innerHTML); // Save chats to local storage
    }
    chatContainer.scrollTo(0, chatContainer.scrollHeight); // Scroll to the bottom
  }, 75);
};

// Function to check if the message is asking about identity or creator
const isIdentityQuestion = (message) => {
  const identityKeywords = [
    'who are you',
    'what is your name',
    'who created you',
    'who made you',
    'who developed you',
    'what are you',
    'introduce yourself',
    'tell me about yourself',
    'who is your creator',
    'who is your developer',
    'who built you',
    'who programmed you',
    'who designed you',
    'who is your maker',
    'who is your owner'
  ];
  
  const lowerMessage = message.toLowerCase();
  return identityKeywords.some(keyword => lowerMessage.includes(keyword));
};

// Function to format code blocks in the response
const formatCodeBlocks = (text) => {
  // Check if the text contains code blocks (text between ```)
  if (text.includes('```')) {
    // Split the text into parts
    const parts = text.split('```');
    let formattedText = '';
    
    for (let i = 0; i < parts.length; i++) {
      if (i % 2 === 0) {
        // Regular text
        formattedText += parts[i];
      } else {
        // Code block
        const codeParts = parts[i].split('\n');
        const language = codeParts[0].trim() || 'plaintext';
        const code = codeParts.slice(1).join('\n');
        
        formattedText += `<div class="code-block">
          <div class="code-header">
            <span class="language">${language}</span>
            <button class="copy-button" onclick="copyCode(this)">
              <span class="material-symbols-rounded">content_copy</span>
            </button>
          </div>
          <pre><code>${code}</code></pre>
        </div>`;
      }
    }
    return formattedText;
  }
  return text;
};

// Function to copy code to clipboard
const copyCode = (button) => {
  const codeBlock = button.closest('.code-block');
  const code = codeBlock.querySelector('code').innerText;
  navigator.clipboard.writeText(code);
  
  // Show copied animation
  button.innerHTML = '<span class="material-symbols-rounded">done</span>';
  setTimeout(() => {
    button.innerHTML = '<span class="material-symbols-rounded">content_copy</span>';
  }, 2000);
};

// Modified generateAPIResponse function to handle code formatting
const generateAPIResponse = async (incomingMessageDiv) => {
  const textElement = incomingMessageDiv.querySelector(".text");

  try {
    // Check if it's an identity question
    if (isIdentityQuestion(userMessage)) {
      const identityResponse = `Hello! I am Sarathi, your intelligent AI assistant. I was created by Vishal Yadav.`;
      showTypingEffect(identityResponse, textElement, incomingMessageDiv);
      return;
    }

    // Send a POST request to the API with the user's message
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: userMessage }],
          },
        ],
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error.message);

    // Get the API response text and format code blocks
    const apiResponse = data?.candidates[0].content.parts[0].text;
    const formattedResponse = formatCodeBlocks(apiResponse);
    
    // Show the formatted response with typing effect
    showTypingEffect(formattedResponse, textElement, incomingMessageDiv);
  } catch (error) {
    isResponseGenerating = false;
    textElement.innerText = error.message;
    textElement.parentElement.closest(".message").classList.add("error");
  } finally {
    incomingMessageDiv.classList.remove("loading");
  }
};

// Show a loading animation while waiting for the API response
const showLoadingAnimation = () => {
  const html = `<div class="message-content">
                  <img class="avatar" src="images/gemini.svg" alt="Gemini avatar">
                  <p class="text"></p>
                </div>
                <span onClick="copyMessage(this)" class="icon material-symbols-rounded">content_copy</span>`;

  const incomingMessageDiv = createMessageElement(html, "incoming", "loading");
  chatContainer.appendChild(incomingMessageDiv);

  chatContainer.scrollTo(0, chatContainer.scrollHeight); // Scroll to the bottom
  generateAPIResponse(incomingMessageDiv);
};

// Copy message text to the clipboard
const copyMessage = (copyButton) => {
  const messageText = copyButton.parentElement.querySelector(".text").innerText;

  navigator.clipboard.writeText(messageText);
  copyButton.innerText = "done"; // Show confirmation icon
  setTimeout(() => (copyButton.innerText = "content_copy"), 1000); // Revert icon after 1 second
};

// Handle sending outgoing chat messages
const handleOutgoingChat = () => {
  userMessage =
    typingForm.querySelector(".typing-input").value.trim() || userMessage;
  if (!userMessage || isResponseGenerating) return; // Exit if there is no message or response is generating

  isResponseGenerating = true;

  const html = `<div class="message-content">
                  <img class="avatar" src="images/user.jpg" alt="User avatar">
                  <p class="text"></p>
                </div>`;

  const outgoingMessageDiv = createMessageElement(html, "outgoing");
  outgoingMessageDiv.querySelector(".text").innerText = userMessage;
  chatContainer.appendChild(outgoingMessageDiv);

  typingForm.reset(); // Clear input field
  document.body.classList.add("hide-header");
  chatContainer.scrollTo(0, chatContainer.scrollHeight); // Scroll to the bottom
  setTimeout(showLoadingAnimation, 500); // Show loading animation after a delay
};

// Toggle between light and dark themes
toggleThemeButton.addEventListener("click", () => {
  const isLightMode = document.body.classList.toggle("light_mode");
  localStorage.setItem("themeColor", isLightMode ? "light_mode" : "dark_mode");
  toggleThemeButton.innerText = isLightMode ? "dark_mode" : "light_mode";
});

// Create and show delete confirmation dialog
const showDeleteConfirmation = () => {
  const dialog = document.createElement('div');
  dialog.className = 'delete-confirmation';
  dialog.innerHTML = `
    <p>Are you sure you want to delete all chats?</p>
    <div class="delete-confirmation-buttons">
      <button class="confirm-delete">Yes, Delete All</button>
      <button class="cancel-delete">Cancel</button>
    </div>
  `;

  document.body.appendChild(dialog);

  // Add event listeners to buttons
  dialog.querySelector('.confirm-delete').addEventListener('click', () => {
    // Clear the chat container
    chatContainer.innerHTML = "";
    
    // Remove from localStorage
    localStorage.removeItem("saved-chats");
    
    // Show the header
    document.body.classList.remove("hide-header");
    
    // Reset the input field
    typingForm.querySelector(".typing-input").value = "";
    
    // Reset the user message
    userMessage = null;
    
    // Remove the dialog
    dialog.remove();
  });

  dialog.querySelector('.cancel-delete').addEventListener('click', () => {
    dialog.remove();
  });
};

// Delete all chats from local storage when button is clicked
deleteChatButton.addEventListener("click", () => {
  if (chatContainer.children.length > 0) {
    showDeleteConfirmation();
  } else {
    alert("There are no chats to delete!");
  }
});

// Set userMessage and handle outgoing chat when a suggestion is clicked
suggestions.forEach((suggestion) => {
  suggestion.addEventListener("click", () => {
    userMessage = suggestion.querySelector(".text").innerText;
    handleOutgoingChat();
  });
});

// Prevent default form submission and handle outgoing chat
typingForm.addEventListener("submit", (e) => {
  e.preventDefault();
  handleOutgoingChat();
});

loadDataFromLocalstorage();
