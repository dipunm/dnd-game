import path from 'path';
import express from 'express';
import http from 'http';
import socketio from 'socket.io';
//import * as mongoosed from "mongoose";
import mongoose from 'mongoose';

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const uri: string = "mongodb://Test:iMc5Ln5P0xQS2OcOK@ds149433.mlab.com:49433/heroku_cfk6wf32";

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

var database = mongoose.connection;
var chatMsgSchema = new mongoose.Schema({
    handle: String,
    message: String
});
var ChatMsg = mongoose.model('ChatMsg', chatMsgSchema);

io.on('connection', socket => {
    console.log('Hey! a connection', socket.id);
    
    socket.on('chat', (handle, message) => {
        io.emit('chat', {handle, message});
        
        var chatMsg = new ChatMsg({
            handle,
            message
        });
        console.log("3");
        chatMsg.save(err => {
            if (err) return console.error(err); // Should I use this, or console.log(err.message)?
        });
        console.log("4");
        /*ChatMsg.find((err, chatMsgs) => {
            if (err) return console.error(err);
            console.log("5");
            console.log(JSON.stringify(chatMsgs.values()));
        });*/
        // Fix validation error + displaying the db
    });
});

server.listen(port, () => {
    console.log(`socket.io listening on port ${port}`);
});