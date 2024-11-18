const express = require('express');
const https = require('https');
const fs = require('fs');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const logger = require('./utils/logger');
const dataRoutes = require('./routes/dataRoutes');
require('dotenv').config();

const app = express();

//Middleware
const allowedOrigins = [
    'http://localhost:3001'
];

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('combined'));

//MongoDB connection
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));

//Routes
app.get('/', (req, res) => {
    res.send('Socket.io server is running');
});

app.use('/api', dataRoutes);

//Error-handling middleware
app.use((err, req, res, next) => {
    logger.error(`${err.message} - ${req.method} ${req.originalUrl}`);
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Internal Server Error'
        }
    });
});

//Rate Limiting middleware
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later.'
});

app.use(limiter);

//Prevent NoSQL Injection middleware
const mongoSanitize = require('express-mongo-sanitize');
app.use(mongoSanitize());

//Compression for Responses
const compression = require('compression');
app.use(compression());

//Security Enhancements
const helmet = require('helmet');
app.use(helmet());

//HTTPS Server and WebSocket
const sslOptions = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};
const httpServer = https.createServer(sslOptions, app);
const io = new Server(httpServer);

//WebSocket events
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

//Start server
const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
    console.log(`Secure server running on https://localhost:${PORT}`);
});

//Testloggor
logger.info('This is an info log');
logger.warn('This is a warning log');
logger.error('This is an error log');

