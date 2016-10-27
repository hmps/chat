// import io from 'socket.io-client';

// const socket = io.connect('http://localhost:3000');
// const urlParams = new URLSearchParams(window.location.search);
// const room = urlParams.get('r');
// const user = Math.round((Math.random() * (100 - 1)) + 1);

// socket.on('connect', () => {
//   socket.emit('admin:connect-room', {
//     user,
//     room,
//   });
// });

// const form = document.querySelector('form');
// const m = document.querySelector('#m');
// const messages = document.querySelector('#messages');

// function appendMessage(message, me, _user) {
//   const li = document.createElement('li');

//   if (me) {
//     li.style.textAlign = 'right';
//     li.innerText = message;
//   } else {
//     li.innerText = `${_user}: ${message}`;
//   }

//   messages.appendChild(li);
// }

// form.addEventListener('submit', (e) => {
//   e.preventDefault();

//   socket.emit('chat', {
//     room,
//     user,
//     msg: m.value,
//   });

//   appendMessage(m.value, true);
//   m.value = '';

//   return false;
// });

// socket.on('admin', (msg) => {
//   window.console.log(msg);
// });

// socket.on('chat', (config) => {
//   window.console.log(config);
//   if (config.from === user) { return; }

//   appendMessage(config.msg, false, config.from);
// });
