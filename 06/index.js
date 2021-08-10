const io = require('socket.io');
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((request, response) => {
    const indexPath = path.join(__dirname, "index.html");
    const readStream = fs.createReadStream(indexPath);
    readStream.pipe(response);
});

const socket = io(server);

socket.on('connection', client => {
    console.log('New client connected');

    client.broadcast.emit('NEW_CLIENT_CONNECTED');

    client.on('CLIENT_MSG', data => {
        const payload = {
            message: data.message.split('').reverse().join('')
        };
        client.emit('SERVER_MSG', payload)
        client.broadcast.emit('SERVER_MSG', payload);
    });
});

server.listen(3000);
