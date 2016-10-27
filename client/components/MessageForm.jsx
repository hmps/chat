import React, { Component } from 'react';

const propTypes = {
  onMessageSubmit: React.PropTypes.func.isRequired,
  user: React.PropTypes.object.isRequired,
};

class MessageForm extends Component {
  static propTypes = propTypes;

  constructor(props) {
    super(props);

    this.state = {
      text: '',
    };
  }

  changeHandler = (e) => {
    this.setState({ text: e.target.value });
  }

  handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    const message = {
      user: this.props.user,
      text: this.state.text,
    };

    this.props.onMessageSubmit(message);
    this.setState({ text: '' });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          onChange={this.changeHandler}
          value={this.text}
          type="text"
          placeholder="Type your message here"
          />
        <input type="submit" value="OK" />
      </form>
    );
  }
}


export default MessageForm;
