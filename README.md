remote-switch
=====

Promise wrapper for remote resolve/reject.

## Description
Making 'chain of Promise' but not want to execute immediately,  

## Requirement
No deps, but Promise required.

## Usage

```javascript
var RemoteSwitch = require('@berlysia/remote-switch');
var rs = new RemoteSwitch;
var log = console.log.bind(console);

rs
.then(function(){return 123})
.then(log)
.then(function(){return 456})
.then(log);
// no output

rs.fire(); // wrapped rs.resolve(), method chainable
// 123
// 456

rs
.then(function(){return 123})
.then(log)
.then(function(){return 456})
.then(log);
// 123
// 456
```

`rs.then(func)` is syntax sugar of `promise = promise.then(func)`.

if you want to access last promise, `rs.current` is what you want. 

```javascript
rs
.then(function(){return 123})
.then(console.log.bind(console))
.then(spy)
.then(assert(!spy.called))
.then(()=>assert(spy.called))
.fire();
// => ok!
```

## Install

```
npm install @berlysia/remote-switch
```

## Licence

MIT

## Author

[berlysia](https://github.com/berlysia)