import React, { Component } from 'react';

const propTypes = {
  onMessageSubmit: React.PropTypes.func.isRequired,
  onTyping: React.PropTypes.func.isRequired,
  onStopTyping: React.PropTypes.func.isRequired,
  user: React.PropTypes.object.isRequired,
};

class MessageForm extends Component {
  static propTypes = propTypes;

  constructor(props) {
    super(props);

    this.state = {
      text: '',
      isTypingTimeout: null,
    };
  }

  changeHandler = (e) => {
    this.setState({ text: e.target.value });

    if (!this.state.isTypingTimeout) {
      this.props.onTyping();
    } else {
      clearTimeout(this.state.isTypingTimeout);
    }

    this.state.isTypingTimeout = setTimeout(() => {
      this.props.onStopTyping();
    }, 10000);
  }

  blurHandler = () => {
    this.props.onStopTyping();
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const message = {
      user: this.props.user,
      text: this.state.text,
    };

    this.props.onStopTyping();
    this.setState({ text: '' });
    this.props.onMessageSubmit(message);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          onChange={this.changeHandler}
          onBlur={this.blurHandler}
          value={this.state.text}
          type="text"
          placeholder="Type your message here"
          />
        <input type="submit" value="OK" />
      </form>
    );
  }
}

export default MessageForm;
