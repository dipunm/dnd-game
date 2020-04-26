var express = require('express');
app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {});

io.on('connection', (conn) => {
    console.log('Hey! a connection', conn.id);
});

server.listen(8888);