# 🤖 Sarthi — Gemini AI Assistant

<div align="center">

<p><strong>A responsive, browser-based AI chatbot powered by the Google Gemini API.</strong></p>

<a href="https://swapan-code.github.io/Gemini-Chatbot-Frontend-Project/"><img src="https://img.shields.io/badge/Live%20Demo-Visit%20Sarthi-2563eb?style=for-the-badge" alt="Live demo" /></a>
<a href="https://github.com/Vishal123-tech/Sarti"><img src="https://img.shields.io/badge/Source%20Code-GitHub-111827?style=for-the-badge&logo=github" alt="Source code" /></a>

<br /><br />

<img src="Screenshot%202025-07-26%20110205.png" width="82%" alt="Sarthi chatbot welcome screen" />

</div>

## ✨ Overview

Sarthi is a lightweight Gemini chatbot interface built with plain HTML, CSS, and JavaScript. It provides a clean conversational experience with suggested prompts, theme switching, locally saved chat history, and a typing-style response animation.

The project is intentionally frontend-first, making it easy to understand, customize, and run without a framework or build step.

## 🚀 Features

- **Gemini API integration** for conversational AI responses
- **Responsive interface** for desktop and mobile screens
- **Light and dark themes** with the preference saved locally
- **Persistent chat history** using browser `localStorage`
- **Suggested prompts** for a faster first interaction
- **Typing animation** for a more natural chat experience
- **Clear chat control** for starting a fresh conversation
- **Identity-aware responses** for common assistant questions

## 🛠️ Tech stack

| Technology | Purpose |
|---|---|
| HTML5 | Page structure and semantic layout |
| CSS3 | Responsive design, themes, and visual styling |
| JavaScript | Chat state, API requests, and interactions |
| Google Gemini API | Generating assistant responses |
| LocalStorage | Saving theme and chat history in the browser |

## 📸 Screenshots

<div align="center">

<img src="Screenshot%202025-07-26%20110205.png" width="48%" alt="Sarthi light interface" />
<img src="2%20Screenshot%202025-07-26%20110343.png" width="48%" alt="Sarthi conversation interface" />

</div>

## 📁 Project structure

```text
Sarti/
├── index.html      # Chatbot layout and controls
├── styles.css      # Responsive layout and theme styles
├── script.js       # Gemini requests and chat interactions
├── Screenshot ...  # Project screenshots
└── README.md       # Project documentation
```

## ▶️ Run locally

```bash
git clone https://github.com/Vishal123-tech/Sarti.git
cd Sarti
```

Then open `index.html` in a browser, or serve the folder with any static server:

```bash
python -m http.server 5500
```

Open [http://localhost:5500](http://localhost:5500) in your browser.

## 🔐 API key note

The current frontend calls the Gemini API directly from the browser. For a real deployment, do **not** expose a production API key in `script.js`. Move the Gemini request to a small backend or serverless function, store the key in an environment variable, and restrict the key by API, domain, and usage limits.

## 🧭 Possible improvements

- Add a backend proxy for protected API-key handling
- Add Markdown and code-block rendering for assistant responses
- Add streaming responses for faster perceived performance
- Add conversation export and message retry controls
- Add rate limiting and clearer error states

## 👤 Author

**Vishal Yadav**

- GitHub: [Vishal123-tech](https://github.com/Vishal123-tech)
- Portfolio: [portfolio-one-sigma-39.vercel.app](https://portfolio-one-sigma-39.vercel.app/)

If you find this project useful, consider giving it a ⭐ on GitHub.
