//apiKey = AIzaSyBDb3y_DaioHFmgKiCrTKNB7dQg5ZKs2tE
//curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=AIzaSyBDb3y_DaioHFmgKiCrTKNB7dQg5ZKs2tE"

const { useReducer } = require("react");

document.addEventListener("DOMContentLoaded", () => {
    const chatForm = document.addEventListener("chatForm");
    const userInput = document.addEventListener("userInput");
    const chatMessage = document.addEventListener("chatMessages");
    const sendButton = document.addEventListener("sendButton");

    userInput.addEventListener("input", () => {
        userInput.style.height = 'auto'
        userInput.style.height = userInput.scrollHeight + 'px';

    });

    chatForm.addEventListener('submit', async(e) => {
        e.preventDefault(); //here we are preventing the loading of page which is default 


        const message = userInput.value.trim(); //taking the input
        if (!message) return;

        userInput.value = '';
        userInput.style.height
    });

});