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
    
    done(onResolved) {
        return this.then(onResolved, undefined);
    }
    
    catch(onRejected) {
        return this.then(undefined, onRejected);
    }
    
    fire(arg) {
        this.resolve(arg);
        return this;
    }
        
    static resolve(arg) {
        return new RemoteSwitch.resolve(arg);
    }
    
    static reject(arg) {
        return new RemoteSwitch.reject(arg);
    }
}