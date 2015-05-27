import Promise from 'bluebird';
import RemoteSwitch from '../lib/RemoteSwitch.js';
import assert from 'power-assert';
import sinon from 'sinon';

let log = console.log.bind(console);

let delay = function(val, wait){
    return new Promise((resolve) => {
         setTimeout(() => resolve(val), wait);
    });
};

describe('RemoteSwitch', () => {
    let rs;
    
    beforeEach(() => {rs = new RemoteSwitch;});
    
    it('then passing arguments called with resolve/reject', (done) => {
        
        rs
        .then((x)=>assert(x === 345))
        .then(()=>123)
        .then((x)=>assert(x === 123))
        .then(()=>Promise.reject(789))
        .catch((x)=>assert(x === 789))
        .fire(345)
        .then(done);
    });
    
    it('pushed tasks will never be executed while not fired', (done) => {
        let spy = sinon.spy();
        
        rs
        .then(spy)
        .then(assert(!spy.called))
        .then(()=>assert(spy.called))
        .then(done)
        .fire();
    });
    
    it('pushed tasks will be executed immediately when fired', (done) => {
        let spy = sinon.spy();
           
        rs
        .fire()
        .then(()=>assert(!spy.called))
        .then(spy)
        .then(()=>assert(spy.called))
        .then(done);
    }); 
});