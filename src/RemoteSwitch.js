export default class RemoteSwitch {
    constructor() {
        this._resolve;
        this._reject;
        this.current = new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        });
    }
    
    then(onResolved, onRejected) {
        this.current = this.current.then(onResolved, onRejected);
        return this;
    }
    
    done(onResolved) {
        return this.then(onResolved, undefined);
    }
    
    catch(onRejected) {
        return this.then(undefined, onRejected);
    }
    
    resolve(...args) {
        this._resolve(...args);
        return this;
    }
    
    fire(...args) {
        return this.resolve(...args);
    }
    
    reject(...args) {
        this._reject(...args);
        return this;
    }
    
    static resolve(...args) {
        return new RemoteSwitch.resolve(...args);
    }
    
    static reject(...args) {
        return new RemoteSwitch.reject(...args);
    }
}