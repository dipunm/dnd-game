import path from 'path';
import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import mongoose from 'mongoose';

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const uri: string = process.env.MONGODB_URI || "mongodb://Test:iMc5Ln5P0xQS2OcOK@ds149433.mlab.com:49433/heroku_cfk6wf32";

var port = process.env.PORT || 8888;


app.use(express.static(path.join(__dirname, '../build')))

mongoose.connect(uri, (err: any) => {
    if (err) {
        console.log("Mongo Error:" + err.message);
    }
    else
    {
        console.log("Successfully connected to the database.");
    }
});

// Set up database variables
const chatMsgSchema = new mongoose.Schema({
    handle: String,
    message: String
});
const ChatMsg = mongoose.model('ChatMsg', chatMsgSchema);

io.on('connection', socket => {
    console.log('Hey! a connection', socket.id);
    
    socket.on('chat', data => {
        io.emit('chat', data); // Send the chat message to every other browser
        // Save chat message to the database
        var chatMsg = new ChatMsg(data);
        chatMsg.save(err => {
            if (err) return console.error(err); // Should I use this, or console.log(err.message)?
        });
    });

    socket.on('chat-init', (callback) => {
        // Send back the database, when ChatObservable emits this event
        ChatMsg.find({},{_id: 0, handle: 1, message: 1},(err, chatMsgs) => {
            if (err) return console.error(err);
            callback(chatMsgs.map((value) => value.toJSON())); // acts like return
        });
    });

});

server.listen(port, () => {
    console.log(`socket.io listening on port ${port}`);
});