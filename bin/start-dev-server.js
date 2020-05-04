const nodemon = require('nodemon');

const killer = () => process.exit(1);

nodemon('server.js');
nodemon.on('crash', killer);
setTimeout(() => nodemon.removeAllListeners('crash') && nodemon.removeAllListeners('exit'), 1000);