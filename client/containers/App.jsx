import React, { Component } from 'react';

import MessageForm from '../components/MessageForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: 'Hampus Persson',
        id: 1234,
      },
      users: [],
      messages: [],
    };
  }

  componentDidMount() {
    // set up socket events
  }

  handleMessageSubmit = (message) => {
    const { messages } = this.state;
    messages.push(message);
    this.setState({ messages });
    window.console.log(message);
    // emit message to socket
  }

  render() {
    return (
      <div>
        <MessageForm
          onMessageSubmit={this.handleMessageSubmit}
          user={this.state.user}
          />
      </div>
    );
  }
}

export default App;
