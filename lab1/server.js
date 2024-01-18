const express = require('express');
const http = require('http');
const path = require('path');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ noServer: true });

app.use(express.static(path.join(__dirname, 'mychat')));

app.get('/', (req, res) => {
    res.send('hi');
});

app.get('/json', (req, res) => {
    res.json({ text: 'hi', numbers: [1, 2, 3] });
});

app.get('/echo', (req, res) => {
    const { input } = req.query;
    if (!input) {
        res.status(400).send('Missing input parameter');
    } else {
        res.json({
            normal: input,
            shouty: input.toUpperCase(),
            characterCount: input.length,
            backwards: input.split('').reverse().join(''),
        });
    }
});

// Handle WebSocket connections
wss.on('connection', (ws) => {
    // Send a welcome message to the connected client
    ws.send('Welcome to the chat!');

    if (typeof message === 'string' && message === 'hello!') {
        ws.send('Hello from server');
    }
    // Listen for messages from the client
    ws.on('message', (message) => {
        console.log(`Received message from client: ${message}`);


        // Broadcast the message to all connected clients
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});

// Handle WebSocket upgrade
server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
