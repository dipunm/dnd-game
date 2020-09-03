import { BehaviourSubject } from "../libraries/Observable";

class TabObservable extends BehaviourSubject<string|null> {

    constructor() 
    {
        super(null);
    }

    public updateActiveTab(tabId: string|null) {
        this.emit(tabId);
    }
}

export default new TabObservable();