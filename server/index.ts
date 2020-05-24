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

io.on('connection', socket => {
    console.log('Hey! a connection', socket.id);

    socket.on('chat', data => io.emit('chat', data));
});

mongoose.connect(uri, (err: any) => {
    if (err) {
        console.log("Mongo Error:" + err.message);
    }
    else
    {
        console.log("Success.");
    }
});

server.listen(port, () => {
    console.log(`socket.io listening on port ${port}`);
});