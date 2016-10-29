import React from 'react';
import classNames from 'classnames';

import styles from './MessageInfo.css';

const propTypes = {
  users: React.PropTypes.object.isRequired,
  typing: React.PropTypes.array.isRequired,
};

function MessageInfo(props) {
  let message = '';

  const classes = classNames({
    [styles.Info]: true,
    [styles.isHidden]: !props.typing.length,
  });

  props.typing.forEach((userId) => {
    message = `${props.users[userId]}, `;
  });

  message = `${message} is typing`;

  return <p className={classes}>{message}</p>;
}
MessageInfo.propTypes = propTypes;

export default MessageInfo;
