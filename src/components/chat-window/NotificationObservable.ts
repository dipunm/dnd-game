import { boundMethod } from 'autobind-decorator'
import { BehaviourSubject } from '../../libraries/Observable';
import socket from '../../libraries/socket';
import UserObservable from '../user-auth/UserObservable';

class NotificationObservable extends BehaviourSubject<Message|null> {
    username!: string;
    
    constructor()
    { 
        super(null);
        //socket.on('notification', this.sendNotification);
        socket.on('chat', this.sendNotification);
        UserObservable.subscribe(user => 
            this.updateUsername(user?.username ?? 'anonymous')
        );
    }

    @boundMethod
    private sendNotification(latestMessage: Message) {
        if (latestMessage.handle !== this.username)
        {
            this.emit(latestMessage);
        }
    }

    @boundMethod
    private updateUsername(username: string) {
        this.username = username;
    }

    sendMessage() {
        socket.emit('notification', {handle: this.username});
    }
}

export default new NotificationObservable();