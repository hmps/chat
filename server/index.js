const app = require('express')();
const http = require('http').Server(app); // eslint-disable-line new-cap
const io = require('socket.io')(http);

io.sockets.on('connection', (socket) => {
  socket.on('admin:connect-room', (config) => {
    socket.join(config.room);
    io.sockets.in(config.room).emit('admin', {
      from: config.user,
      msg: 'User has connected',
    });
  });

  socket.on('chat', (config) => {
    io.sockets.in(config.room).emit('chat', {
      from: config.user,
      msg: config.msg,
    });
  });
});

http.listen(3000, () => {
  global.console.log('listening on *:3000');
});
