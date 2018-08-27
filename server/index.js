import express from 'express';
import http from 'http';
import SocketIO from 'socket.io';

const app = express();
const server = http.Server(app);
const io = SocketIO(server);

io.on('connection', function(socket) {
  socket.on('date message', function(msg) {
    socket.emit('ololo message', {msg: msg + '::::OLOLO'});
  });
  console.log('a user connected');
});

server.listen(3000, function(){
  console.log('listening on *:3000');
});
