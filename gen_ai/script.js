document.addEventListener("DOMContentLoaded", () => {
  const chatForm = document.getElementById("chatForm");
  const userInput = document.getElementById("userInput");
  const chatMessages = document.getElementById("chatMessages");
  const sendButton = document.getElementById("sendButton");

  // Conversation history for multi-turn context
  const conversationHistory = [];

  // Auto-resize textarea
  userInput.addEventListener("input", () => {
    userInput.style.height = "auto";
    userInput.style.height = userInput.scrollHeight + "px";
  });

  chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = userInput.value.trim();
    if (!message) return;

    addMessage(message, true);
    userInput.value = "";
    userInput.style.height = "auto";
    sendButton.disabled = true;

    const typingIndicator = showTypingIndicator();

    try {
      const response = await generateResponse(message);
      typingIndicator.remove();
      addMessage(response, false);
    } catch (error) {
      typingIndicator.remove();
      addErrorMessage(error.message);
    } finally {
      sendButton.disabled = false;
    }
  });

  async function generateResponse(prompt) {
    // Add user message to history
    conversationHistory.push({
      role: "user",
      parts: [{ text: prompt }],
    });

    // ⚠️ Move your API key to a backend — never expose it in frontend code
    const API_KEY = "AIzaSyDevyYAo-SVLBOVBMZbUuuilMQKaehtxJc";
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: conversationHistory }),
      }
    );

    if (!response.ok) {
      // Remove the last user message if the request failed
      conversationHistory.pop();
      const err = await response.json().catch(() => ({}));
      throw new Error(err?.error?.message || "Failed to generate a response");
    }

    const data = await response.json();
    const replyText = data.candidates[0].content.parts[0].text;

    // Add assistant reply to history
    conversationHistory.push({
      role: "model",
      parts: [{ text: replyText }],
    });

    return replyText;
  }

  function addMessage(text, isUser) {
    const message = document.createElement("div");
    message.className = `message ${isUser ? "user-message" : ""}`;

    const avatar = document.createElement("div");
    avatar.className = `avatar ${isUser ? "user-avatar" : ""}`;
    avatar.textContent = isUser ? "U" : "AI"; // textContent prevents XSS

    const content = document.createElement("div");
    content.className = "message-content";
    content.textContent = text; // textContent prevents XSS

    message.appendChild(avatar);
    message.appendChild(content);
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function showTypingIndicator() {
    const indicator = document.createElement("div");
    indicator.className = "message";
    indicator.innerHTML = `
      <div class="avatar">AI</div>
      <div class="typing-indicator">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    `;
    chatMessages.appendChild(indicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return indicator;
  }

  function addErrorMessage(text) {
    const message = document.createElement("div");
    message.className = "message";

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = "AI";

    const content = document.createElement("div");
    content.className = "message-content";
    content.style.color = "red";
    content.textContent = `Error: ${text}`; // textContent prevents XSS

    message.appendChild(avatar);
    message.appendChild(content);
    chatMessages.appendChild(message); // ✅ Fixed: was missing this line
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
});