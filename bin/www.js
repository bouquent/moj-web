var app = require('../app');
var http = require('http');
var port = "8081";
app.set('port', port)

var server = http.createServer(app);

server.listen(port);
server.on('error', onError)
server.on('listening', onListening);

function onListening() {
    console.log("server listening at 8081 port");
}

function onError(error) {
    var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
          console.error(bind + ' requires elevated privileges');
          process.exit(1);
          break;
        case 'EADDRINUSE':
          console.error(bind + ' is already in use');
          process.exit(1);
          break;
        default:
          throw error;
      }
}
