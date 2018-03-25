import React from 'react';
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
        isActive={activeChat && chat._id === activeChat._id}
        onClick={() => setActiveChat(chat._id)}
        /* eslint-enable no-underscore-dangle */
        disabled={disabled}
      />
    ))}
  </List>
);

export default withStyles(styles)(ChatList);
