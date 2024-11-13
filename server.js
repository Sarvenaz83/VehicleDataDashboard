const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const dataRoutes = require('./routes/dataRoutes');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', dataRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the WebSocket and API server!');
});


io.on('connection', (socket) => {
    console.log('New WebSocket connection established');

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
