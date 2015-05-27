import Promise from 'bluebird';
import RemoteSwitch from '../lib/RemoteSwitch.js';
import assert from 'power-assert';
import sinon from 'sinon';

let log = console.log.bind(console);

let id = Object;

let delay = function(val, wait){
    return new Promise((resolve) => {
         setTimeout(() => resolve(val), wait);
    });
};

describe('RemoteSwitch', () => {
    let rs;
    
    beforeEach(() => {rs = new RemoteSwitch;});
    
    it('pushed tasks will never be executed while not fired', (done) => {
        let spy = sinon.spy();
        
        rs
        .then(123)
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