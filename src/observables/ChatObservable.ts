import { BehaviourSubject } from "../lib/Observable";
import socket from '../lib/socket'
import UserObservable from "./UserObservable";
import { boundMethod } from 'autobind-decorator'

export type Message = { message: string, handle: string };

class ChatObservable extends BehaviourSubject<Message[]> {
    messages: Message[];
    username!: string;
    constructor(messages: Message[] = [], username: string = 'anonymous') {
        super(messages);
        this.messages = messages;
        this.username = username;

        // Ask the server for a response on the event 'chat-init'
        socket.emit('chat-init', this.setMessages);
        socket.on('chat', this.appendMessage);
        UserObservable.subscribe(user => 
            this.updateUsername(user?.username ?? 'anonymous')
        );
    }

    @boundMethod
    private setMessages(chatMsgs: Message[]) {
        this.messages.push(...chatMsgs); // Add the chat messages from the callback function in the server to the messages array (spread is required here to make it work?) 
        this.emit([...this.messages]); // Send the new message array to Chat.tsx + all other "observers" (I assume any other file that uses this as an observable)
    }

    @boundMethod
    private appendMessage({ message, handle }: Message) {
        this.messages.push({ message, handle });
        this.emit([...this.messages]);
    }

    @boundMethod
    private updateUsername(username: string) {
        this.username = username;
    }

    sendMessage(message: string) {
        socket.emit('chat', { message, handle: this.username });
    }
}

export default new ChatObservable();