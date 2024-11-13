const express = require('express');
const http = require('http');
const { Server } = require('socket.io'); // Make sure this syntax is correct for your version of Socket.io

const app = express();
const server = http.createServer(app); // Create an HTTP server
const io = new Server(server); // Initialize Socket.io with the HTTP server

const PORT = process.env.PORT || 3000;

// Sample route to check if the server is working
app.get('/', (req, res) => {
    res.send('Socket.io server is running');
});

// Listen for WebSocket connections
io.on('connection', (socket) => {
    console.log('New client connected');

    const data = {
        speed: Math.random() * 100,
        fuelConsumption: Math.random() * 10,
        safetyWarnings: Math.floor(Math.random() * 5),
    };

    // Send a message to the client
    socket.emit('message', JSON.stringify(data));

    // Handle messages from the client
    socket.on('clientMessage', (data) => {
        console.log('Received from client:', data);
    });
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
