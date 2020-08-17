function createHandle(handlers: any[], handler: any) {
    return {
        unsubscribe: () => {
            handlers.splice(handlers.indexOf(handler), 1);
        }
    }
}

type Handler<T> = (subject: T) => void

export class BehaviourSubject<T> {
    handlers: Handler<T>[];
    subject: T;
    protected constructor(subject: T) {
        this.subject = subject;
        this.handlers = [];
    }

    subscribe(handler: Handler<T>) {
        this.handlers.push(handler);
        handler(this.subject);
        return createHandle(this.handlers, handler);
    }

    emit(data: T) {
        this.subject = data;
        this.handlers.forEach((handler: (arg0: any) => void) => {
            handler(this.subject);
        });
    }
}

export class Subject<T> {
    handlers: Handler<T>[];
    constructor() {
        this.handlers = [];
    }

    subscribe(handler: Handler<T>) {
        this.handlers.push(handler);
        return createHandle(this.handlers, handler);
    }

    emit(data: T) {
        this.handlers.forEach((handler: (arg0: any) => void) => {
            handler(data);
        });
    }
}
