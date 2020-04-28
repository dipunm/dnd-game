import Observable from "../lib/Observable";

class UserObservable extends Observable {
    constructor() {
        const username = localStorage.getItem('username');
        const user = username ? { username } : null;
        super(user);
        this.user = user;
    }

    reset() {
        this.user = null;
        localStorage.removeItem('username');
        localStorage.removeItem('displayName');
        this.emit(this.user);
    }

    createUser(username) {
        if (username) {
            this.user = { username };
            localStorage.setItem('username', username);
            localStorage.removeItem('displayName');
            this.emit({...this.user});
        }
    }

    setDisplayName(name) {
        this.user.displayName = name;
        localStorage.setItem('displayName', name);
        this.emit(this.user);
    }
}

export default new UserObservable();