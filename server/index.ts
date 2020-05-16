import socketio from 'socket.io';

const io = socketio();

io.on('connection', socket => {
    console.log('Hey! a connection', socket.id);
    socket.on('chat', data => io.emit('chat', data))
});

io.listen(8888);
console.log('socket.io listening on port 8888');