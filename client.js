const { io } = require('socket.io-client');

const socket = io('http://localhost:3001');

socket.on('connect', () => {
    console.log('Connected to the server!');

    socket.emit('clientMessage', 'Hello from the client!');
});


socket.on('message', (data) => {
    try {
        const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
        console.log('Messege from server:', parsedData);
    }
    catch (error) {
        console.error('Failed to parse JSON:', error);
        console.log('Rae message from server:', data);
    }
});

socket.on('disconnect', () => {
    console.log('Disconnected from the server');
})