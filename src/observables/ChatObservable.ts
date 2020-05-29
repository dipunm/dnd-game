import { BehaviourSubject } from "../lib/Observable";
import socket from '../lib/socket'
import UserObservable from "./UserObservable";

export type Message = { message: string, handle: string };

class ChatObservable extends BehaviourSubject<Message[]> {
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

        // Ask the server for a response on the event 'chat-init'
        socket.emit('chat-init', (chatMsgs: Message[]) => {
            this.messages.push(...chatMsgs); // Add the chat messages from the callback function in the server to the messages array (spread is required here to make it work?) 
            this.emit([...this.messages]); // Send the new message array to Chat.tsx + all other "observers" (I assume any other file that uses this as an observable)
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