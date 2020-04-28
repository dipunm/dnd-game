var express = require('express');
app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {});

io.on('connection', socket => {
    console.log('Hey! a connection', socket.id);
    socket.on('chat', data => io.emit('chat', data))
});

// app.get('/myurl',( req, res )  => { res.send("hello") });

server.listen(8888);
