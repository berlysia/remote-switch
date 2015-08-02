export default class RemoteSwitch {
    constructor() {
        this.resolve;
        this.reject;
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
        this.current = this.promise;
    }
    
    then(onResolved, onRejected) {
        this.current = this.current.then(onResolved, onRejected);
        return this;
    }
    
    catch(onRejected) {
        return this.then(undefined, onRejected);
    }
    
    fire(arg) {
        this.resolve(arg);
        return this;
    }
        
    static resolve(arg) {
        const ret = new RemoteSwitch();
        ret.resolve(arg)
        return ret;
    }
    
    static reject(arg) {
        const ret = new RemoteSwitch();
        ret.reject(arg);
        return ret;
    }
}