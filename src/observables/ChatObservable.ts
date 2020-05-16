import Observable from "../lib/Observable";
import socket from '../lib/socket'
import UserObservable from "./UserObservable";

type Message = { message: string, handle: string };

class ChatObservable extends Observable<Message[]> {
    messages: Message[];
    username!: string;
    constructor() {
        const messages: Message[] = [];
        super(messages);
        this.messages = messages;

        UserObservable.subscribe((user) => {
            if (user == null) {
                this.username = 'anonymous';
            } else {
                this.username = user.username;
            }
        });

        socket.on('chat', ({ message, handle }: Message) => {
            this.messages.push({ message, handle });
            this.emit([...this.messages]);
        });
    }

    sendMessage(message: string) {
        socket.emit('chat', { message, handle: this.username });
    }
}

export default new ChatObservable();