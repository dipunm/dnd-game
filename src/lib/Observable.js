function createHandle(handlers, handler) {
    return {
        unsubscribe: () => {
            handlers.splice(handlers.indexOf(handler), 1);
        }
    }
}

export default class Observable {
    constructor(subject) {
        this.subject = subject;
        this.handlers = [];
    }

    subscribe(handler) {
        this.handlers.push(handler);
        handler(this.subject);
        return createHandle(this.handlers, handler);
    }

    emit(data) {
        this.subject = data;
        this.handlers.forEach(handler => {
            handler(this.subject);
        });
    }
}
