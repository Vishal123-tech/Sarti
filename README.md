# Sarthi

<a href="https://swapan-code.github.io/Gemini-Chatbot-Frontend-Project/" target="_blank">Live Link</a>
<br>
<br>
Screenshots:
![image](https://github.com/Vishal123-tech/Sarti/blob/main/Screenshot%202025-07-26%20110205.png)
<br>
<br>
![image](https://github.com/Vishal123-tech/Sarti/blob/main/2%20Screenshot%202025-07-26%20110343.png)
<br>
<br>


Welcome to the **Gemini Chatbot** project! This project showcases the development of a responsive and interactive chatbot interface using **HTML**, **CSS**, and **JavaScript**. The chatbot leverages the Google Gemini API to provide dynamic responses based on user input, offering an engaging user experience.

## Features

- **Responsive Design**: The UI is fully responsive, ensuring optimal performance on both desktop and mobile devices.
- **Dynamic API Integration**: Integrated with the Google Gemini API to generate real-time responses based on user queries.
- **Theme Toggle**: Users can switch between light and dark modes, with preferences stored in local storage.
- **Local Storage**: Chat history and user settings are preserved across sessions, providing a consistent and personalized experience.
- **User-Friendly Interface**: Includes pre-configured suggestions to help users quickly explore the chatbot’s capabilities.

## Project Structure

- `index.html`: The main HTML file that structures the chatbot interface.
- `styles.css`: Contains all the CSS styles for layout, theme, and responsiveness.
- `script.js`: JavaScript file responsible for handling user interactions, API requests, theme toggling, and local storage management.

## Installation

To get a local copy up and running, follow these simple steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/Swapan-code/Gemini-Chatbot-Frontend-Project.git
    ```
   
2. **Open the project directory**:
    ```bash
    cd Gemini-Chatbot-Frontend-Project
    ```

3. **Run the project**:
   Simply open `index.html` in your browser to see the chatbot in action.

## Usage

- Type a prompt in the input box and hit the send button to interact with the chatbot.
- Use the theme toggle button to switch between light and dark modes.
- Chat history will be automatically saved and loaded on subsequent visits.

## API Configuration

This project uses the Google Gemini API. To use your own API key, replace the existing API key in `script.js`:

```javascript
const API_KEY = "YOUR_API_KEY_HERE"; 
