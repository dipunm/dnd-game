import path from 'path';
import express from 'express';
import http from 'http';
import socketio from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = socketio(server);

var port = process.env.PORT || 8888;


app.use(express.static(path.join(__dirname, '../build')))

io.on('connection', socket => {
    console.log('Hey! a connection', socket.id);

    socket.on('chat', data => io.emit('chat', data));
});

server.listen(port, () => {
    console.log(`socket.io listening on port ${port}`);
});