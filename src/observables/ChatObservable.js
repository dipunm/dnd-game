import Observable from "../lib/Observable";
import socket from '../lib/socket'
import UserObservable from "./UserObservable";

class ChatObservable extends Observable {
    constructor() {
        const messages = [];
        super(messages);
        this.messages = messages;

        UserObservable.subscribe((user) => {
            if (user == null) {
                this.username = 'anonymous';
            } else {
                this.username = user.username;
            }
        });

        socket.on('chat', ({ message, handle }) => {
            this.messages.push({ message, handle });
            this.emit([...this.messages]);
        });
    }

    sendMessage(message) {
        socket.emit('chat', { message, handle: this.username });
    }
}

export default new ChatObservable();