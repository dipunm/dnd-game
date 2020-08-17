import { ChangeEvent, KeyboardEvent } from 'react';
import { Subject } from '../../libraries/Observable';

export class ChatBoxObservable extends Subject<{action: 'update' | 'submit', value: string}> {
    private enterIsActive = false;
    private shiftKey = false;
    private repeating = false;
    private keyuptime = 0;
    private changetime = 0;
    private deferredValue = '';

    onKeyPress({key, repeat, timeStamp, shiftKey}: KeyboardEvent): void {
        this.recordEnterState(key, true, timeStamp, repeat, shiftKey);
        if (this.enterIsActive && this.repeating)
            this.submit();
    }

    onChange({ target: { value }, timeStamp }: ChangeEvent<HTMLTextAreaElement>): void {
        const first = !this.repeating;
        if (this.enterIsActive && first && !this.shiftKey)
            this.deferEnterAction(value, timeStamp);
        else if (this.enterIsActive && this.shiftKey)
            this.updateInput(value);
        else if (this.enterIsActive)
            this.submit();
        else
            this.updateInput(value);
    } 

    onKeyUp({ key, timeStamp }: KeyboardEvent): void {
        this.recordEnterState(key, false, timeStamp);
        if (key === 'Enter' && this.deferredValue) {
            this.handleEnter();
        }
    }

    private recordEnterState(key: string, down: boolean, time: number, repeating = false, shiftKey = false): void {
        if (key === 'Enter') {
            this.enterIsActive = down;
        } else if (down) {
            this.enterIsActive = false;
        }
        this.repeating = repeating;
        this.shiftKey = shiftKey;

        if (!down) {
            this.keyuptime = time;
        }
    }

    private deferEnterAction(capturedValue: string, time: number): void {
        this.deferredValue = capturedValue;
        this.changetime = time;
    }

    private handleEnter(): void {
        if (this.changetime > this.keyuptime) {
            // virtual touch keyboard.
            this.updateInput(this.deferredValue);
        } else {
            this.submit();
        }
    }

    private updateInput(value: string) {
        this.emit({ action: 'update', value });
        this.deferredValue = '';
    }
    
    private submit() {
        this.emit({ action: 'submit', value: this.deferredValue });
        this.deferredValue = '';
    }
}
