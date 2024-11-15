const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');

const dataRoutes = require('./routes/dataRoutes');

const app = express();
const server = http.createServer(app); 
const io = new Server(server);

app.use(cors({ origin: 'http://localhost:3001' }));
app.use(express.json());

const mongoURI = 'mongodb://localhost:27017/vehicleDataDB';

mongoose.connect(mongoURI)
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('MongoDB connection error:', error));

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Socket.io server is running');
});

app.use('/api', dataRoutes);

io.on('connection', (socket) => {
    console.log('New client connected');

    const data = {
        speed: Math.random() * 100,
        fuelConsumption: Math.random() * 10,
        safetyWarnings: Math.floor(Math.random() * 5),
    };

    socket.emit('message', JSON.stringify(data));

    socket.on('clientMessage', (data) => {
        console.log('Received from client:', data);
    });
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
