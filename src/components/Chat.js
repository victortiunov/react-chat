import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import ChatMessageList from './ChatMessageList';
import MessageInput from './MessageInput';

const styles = theme => ({
  chatLayout: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '64px',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
  },
  info: {
    padding: theme.spacing.unit * 3,
  },
});

const Chat = ({
  classes, user, activeChat, joinChat, sendMessage, isConnected,
}) => (
  <main className={classes.chatLayout}>
    {activeChat ? (
      <React.Fragment>
        <ChatMessageList user={user} messages={activeChat.messages} />
        <MessageInput
          sendMessage={sendMessage}
          user={user}
          // eslint-disable-next-line
          onJoinClick={() => joinChat(activeChat._id)}
          disabled={!isConnected}
        />
      </React.Fragment>
    ) : (
      <Paper className={classes.info}>
        <Typography variant="body1" gutterBottom>
          Please select a chat to start messaging…
        </Typography>
        <Typography variant="body1" gutterBottom>
          Use <strong>Global</strong> to explore communities around here.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Use <strong>My Chats</strong> to see your recent conversations.
        </Typography>
      </Paper>
    )}
  </main>
);

Chat.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  user: PropTypes.shape({
    username: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    isMember: PropTypes.bool.isRequired,
    isCreator: PropTypes.bool.isRequired,
    isChatMember: PropTypes.bool.isRequired,
  }).isRequired,
  activeChat: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }),
  joinChat: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  isConnected: PropTypes.bool.isRequired,
};

Chat.defaultProps = {
  activeChat: null,
};

export default withStyles(styles)(Chat);
