import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List from 'material-ui/List';
import ChatListItem from './ChatListItem';

const styles = () => ({
  chatsList: {
    height: 'calc(100% - 56px)',
    overflowY: 'scroll',
  },
});

const ChatList = ({
  classes, activeChat, chats, setActiveChat, disabled,
}) => (
  <List className={classes.chatsList}>
    {chats.map(chat => (
      <ChatListItem
        /* eslint-disable no-underscore-dangle */
        key={chat._id}
        {...chat}
        isActive={activeChat ? chat._id === activeChat._id : false}
        onClick={() => setActiveChat(chat._id)}
        /* eslint-enable no-underscore-dangle */
        disabled={disabled}
      />
    ))}
  </List>
);

ChatList.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  activeChat: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    creator: PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }).isRequired,
    members: PropTypes.arrayOf(PropTypes.object).isRequired,
  }),
  chats: PropTypes.arrayOf(PropTypes.object).isRequired,
  setActiveChat: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

ChatList.defaultProps = {
  activeChat: null,
};

export default withStyles(styles)(ChatList);
