const EventEmitter = require('events');

const myEmitter = new EventEmitter();

myEmitter.on('greet', (name) => {
    console.log(`Привіт, ${name}!`);
});

myEmitter.emit('greet', 'Крістіна');