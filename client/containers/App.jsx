import io from 'socket.io-client';
import React, { Component } from 'react';

import MessageForm from 'components/MessageForm';
import MessageInfo from 'components/MessageInfo/MessageInfo';
import MessageList from 'components/MessageList/MessageList';

const socket = io.connect('http://localhost:3000');

function logMessage(msg) {
  window.console.log(msg);
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: 'Hampus Persson',
        id: Math.round(Math.random() * 999),
      },
      connectedUsers: {},
      typingUsers: [],
      room: 1,
      users: [],
      messages: [],
    };
  }

  componentDidMount() {
    socket.on('connect', () => socket.emit('admin:userConnected', {
      user: this.state.user,
      room: this.state.room,
    }));
    socket.on('admin:userConnected', (config) => {
      this.setState({
        connectedUsers: Object.assign({}, this.state.connectedUsers, {
          [config.user.id]: config.user.name,
        }),
      });
    });
    socket.on('admin:userDisconnected', logMessage);
    socket.on('chat:userTyping', (config) => {
      if (config.user.id !== this.state.user.id) {
        this.setState({
          typingUsers: this.state.typingUsers.concat([config.user.id]),
        });
      }
    });
    socket.on('chat:userStopTyping', (config) => {
      this.setState({
        typingUsers: this.state.typingUsers.filter(userId => userId !== config.user.id),
      });
    });
    socket.on('chat:incomingMessage', this.incomingMessage.bind(this));
  }

  componentWillUnmount() {
    socket.emit('admin:disconnect');
  }

  incomingMessage(config) {
    let messages;

    if (config.from.id === this.state.user.id) {
      messages = this.state.messages.map(message => (message.tempId ? Object.assign({}, config.msg, {
        ownMessage: true,
      }) : message));
    } else {
      messages = this.state.messages.concat(config.msg);
    }

    this.setState({
      messages,
    });
  }

  handleMessageSubmit = (message) => {
    const messages = this.state.messages.concat([Object.assign({}, message, {
      id: `_${Date.now()}`,
      tempId: true,
      ownMessage: true,
    })]);

    this.setState({ messages });

    socket.emit('chat:sendMessage', {
      user: this.state.user,
      room: this.state.room,
      msg: message,
    });
  }

  handleTyping = () => {
    socket.emit('chat:userTyping', {
      user: this.state.user,
      room: this.state.room,
    });
  }

  handleStopTyping = () => {
    socket.emit('chat:userStopTyping', {
      user: this.state.user,
      room: this.state.room,
    });
  }

  render() {
    return (
      <div>
        <MessageList
          messages={this.state.messages}
          user={this.state.user}
          />
        <MessageInfo
          users={this.state.connectedUsers}
          typing={this.state.typingUsers}
          />
        <MessageForm
          onMessageSubmit={this.handleMessageSubmit}
          onTyping={this.handleTyping}
          onStopTyping={this.handleStopTyping}
          user={this.state.user}
          />
      </div>
    );
  }
}

export default App;
