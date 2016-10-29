const app = require('express')();
const http = require('http').Server(app); // eslint-disable-line new-cap
const io = require('socket.io')(http);



io.sockets.on('connection', (socket) => {
  socket.on('admin:userConnected', (config) => {
    socket.join(config.room);

    io.sockets.in(config.room).emit('admin:userConnected', {
      user: config.user,
    });
  });

  socket.on('admin:disconnect', (config) => {
    io.sockets.in(config.room).emit('admin:userDisconnected', {
      from: config.user,
      msg: 'User has disconnected',
    });
  });

  socket.on('chat:sendMessage', (config) => {
    console.log('incoming');
    io.sockets.in(config.room).emit('chat:incomingMessage', {
      from: config.user,
      msg: Object.assign(config.msg, {
        id: Date.now(),
      }),
    });
  });

  socket.on('chat:userTyping', (config) => {
    io.sockets.in(config.room).emit('chat:userTyping', {
      user: config.user,
    });
  });

  socket.on('chat:userStopTyping', (config) => {
    io.sockets.in(config.room).emit('chat:userStopTyping', {
      user: config.user,
    });
  });
});

http.listen(3000, () => {
  global.console.log('listening on *:3000');
});
