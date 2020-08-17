import { BehaviourSubject } from "../../libraries/Observable";

export interface User {
    username: string
    characterName?: string
}

class UserObservable extends BehaviourSubject<User | null> {
    private user: User | null;
    constructor() {
        const username = localStorage.getItem('username');
        const characterName = localStorage.getItem('characterName') || undefined;
        const user = username ? { username, characterName } : null;
        super(user);
        this.user = user;
    }

    reset() {
        this.user = null;
        localStorage.removeItem('username');
        localStorage.removeItem('characterName');
        this.emit(this.user);
    }

    createUser(username: string) {
        if (username) {
            this.user = { username };
            localStorage.setItem('username', username);
            localStorage.removeItem('characterName');
            this.emit({ ...this.user });
        }
    }

    setCharacterName(name: string) {
        if (!this.user) {
            throw Error("Unable to set display name.")
        }
        this.user.characterName = name;
        localStorage.setItem('characterName', name);
        this.emit({ ...this.user });
    }
}

export default new UserObservable();