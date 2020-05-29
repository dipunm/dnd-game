import path from 'path';
import express from 'express';
import http from 'http';
import socketio from 'socket.io';

import { ChatMsg } from './mongo';

const app = express();
const server = http.createServer(app);
const io = socketio(server);

var port = process.env.PORT || 8888;

app.use(express.static(path.join(__dirname, '../build')))

io.on('connection', socket => {    
    socket.on('chat-init', (callback: (messages: Message[]) => void) => {
        // Send back the database, when ChatObservable emits this event
        ChatMsg.find((err, chatMsgs) => {
            if (err) return console.error(err);
            const messages = chatMsgs.map<Message>((value) => value.toJSON());
            callback(messages); // acts like return
        });
    });

    socket.on('chat', (data: Message) => {
        io.emit('chat', data); // Send the chat message to every other browser
        // Save chat message to the database
        var chatMsg = new ChatMsg(data);
        chatMsg.save(err => {
            if (err) return console.error(err); // Should I use this, or console.log(err.message)?
        });
    });
});

server.listen(port, () => {
    console.log(`socket.io listening on port ${port}`);
});