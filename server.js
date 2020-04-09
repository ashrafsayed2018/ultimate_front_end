var staticServer = require('static-server');

var server = new staticServer ({
rootPath: "./dist",  // the root path of the static server 
port    : 1337  // the poet of the static server 
});

// message when server starts 

server.start(function () {
    console.log('server starts at port' + server.port);
})