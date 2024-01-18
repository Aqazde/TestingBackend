document.addEventListener("DOMContentLoaded", function () {
    const inputField = document.getElementById("messageInput");
    const messagesContainer = document.getElementById("messages");

    const ws = new WebSocket("ws://localhost:3000");

    ws.onopen = function () {
        console.log("Connected to the server");
    };

    ws.onmessage = function (event) {
        const message = event.data;
        console.log("Received message from server:", message);
        appendMessage(message, false);
    };

    const appendMessage = (message, isOutgoing) => {
        const messageContainer = document.createElement("div");
        messageContainer.classList.add(isOutgoing ? "outgoing-chats" : "received-chats");

        const avatarContainer = document.createElement("div");
        avatarContainer.classList.add(isOutgoing ? "outgoing-chats-img" : "received-chats-img");

        const avatarImg = document.createElement("img");
        avatarImg.src = "user1.png";

        const messageContent = document.createElement("div");
        messageContent.classList.add(isOutgoing ? "outgoing-msg" : "received-msg");

        const messageText = document.createElement("div");
        messageText.classList.add(isOutgoing ? "outgoing-chats-msg" : "received-msg-inbox");

        const messageParagraph = document.createElement("p");
        messageParagraph.textContent = message;

        const timeSpan = document.createElement("span");
        timeSpan.classList.add("time");
        const currentTime = new Date();
        timeSpan.textContent = currentTime.toLocaleTimeString("en-US") + " | " + currentTime.toDateString();

        avatarContainer.appendChild(avatarImg);
        messageText.appendChild(messageParagraph);
        messageText.appendChild(timeSpan);
        messageContent.appendChild(messageText);
        messageContainer.appendChild(avatarContainer);
        messageContainer.appendChild(messageContent);

        // Append the message container to the correct section based on isOutgoing
        const messagesContainer = document.getElementById("messages");

        // Reverse the order of insertion, so new messages go to the bottom
        messagesContainer.appendChild(messageContainer);

        // Scroll to the bottom to show the latest message
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    };


    const sendMessage = (message) => {
        ws.send(message);
    };

    document.getElementById("messageForm").addEventListener("submit", function (event) {
        event.preventDefault();
        const message = inputField.value.trim();

        if (message !== "") {
            appendMessage(message, true);
            sendMessage(message);
            inputField.value = "";
        }
    });

    // Add a function to handle messages sent from the server
    const handleServerMessage = (message) => {
        // Assuming the server's message is already formatted
        appendMessage(message, false);
    };

    // Expose the function globally so the server can call it
    window.handleServerMessage = handleServerMessage;
});
