import React from 'react';

import styles from './MessageItem.css';

const propTypes = {
  message: React.PropTypes.object.isRequired,
};

function MessageItem(props) {
  const className = props.message.ownMessage ? styles.ownMessage : styles.otherMessage;

  return (
    <div className={className}>
      <span className={styles.userName}>{props.message.user.id}</span>
      {props.message.text}
    </div>
  );
}
MessageItem.propTypes = propTypes;

export default MessageItem;
