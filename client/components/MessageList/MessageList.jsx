import React from 'react';

import MessageItem from 'components/MessageItem/MessageItem';

import styles from './MessageList.css';

const propTypes = {
  messages: React.PropTypes.array.isRequired,
};

function MessageList(props) {
  const items = props.messages.map(message => <MessageItem key={message.id} message={message} />);

  return (
    <div className={styles.MessageList}>
      {items}
    </div>
  );
}
MessageList.propTypes = propTypes;

export default MessageList;
