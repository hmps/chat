import React from 'react';
import classNames from 'classnames';

import styles from './MessageItem.css';

const propTypes = {
  message: React.PropTypes.object.isRequired,
};

function MessageItem(props) {
  const containerClasses = classNames({
    [styles.Container]: true,
    [styles.ownMessage]: props.message.ownMessage,
  });

  return (
    <div className={containerClasses}>
      <div className={styles.userName}>{props.message.user.id}</div>
      <div className={styles.MessageItem}>{props.message.text}</div>
    </div>
  );
}
MessageItem.propTypes = propTypes;

export default MessageItem;
