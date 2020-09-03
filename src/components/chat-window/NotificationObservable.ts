import { boundMethod } from 'autobind-decorator'
import { BehaviourSubject } from '../../libraries/Observable';
import socket from '../../libraries/socket';
import UserObservable from '../user-auth/UserObservable';

class NotificationObservable extends BehaviourSubject<boolean> {
    username!: string;

    constructor() 
    {
        super(false);
        socket.on('notification', this.sendNotification);
        UserObservable.subscribe(user => 
            this.updateUsername(user?.username ?? 'anonymous')
        );
    }

    @boundMethod
    private sendNotification(handle: string) {
        this.emit(handle !== this.username); // Send the new message array to Chat.tsx + all other "observers" (I assume any other file that uses this as an observable)
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