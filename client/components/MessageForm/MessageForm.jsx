import React, { Component } from 'react';

import styles from './MessageForm.css';

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
      <form className={styles.MessageForm} onSubmit={this.handleSubmit}>
        <input
          type="text"
          onChange={this.changeHandler}
          onBlur={this.blurHandler}
          value={this.state.text}
          placeholder="Type your message here"
          />
        <button type="submit" className="button">Skicka</button>
      </form>
    );
  }
}
export default MessageForm;
