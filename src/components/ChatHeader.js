import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Avatar from './Avatar';
import ChatMenu from './ChatMenu';
import UserMenu from './UserMenu';

const styles = theme => ({
  appBar: {
    position: 'fixed',
    width: 'calc(100% - 320px)',
  },
  appBarTitle: {
    flex: 1,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    color: theme.palette.secondary.contrastText,
  },
});

const ChatHeader = ({
  classes,
  user,
  editUser,
  onLogout,
  activeChat,
  leaveChat,
  deleteChat,
  joinChat,
  isConnected,
}) => (
  <AppBar color="primary" className={classes.appBar}>
    <Toolbar>
      {activeChat ? (
        <React.Fragment>
          <Avatar colorFrom={activeChat.title}>{activeChat.title}</Avatar>
          <Typography variant="title" className={classes.appBarTitle}>
            {activeChat.title}
            <ChatMenu
              user={user}
              /* eslint-disable no-underscore-dangle */
              onLeaveClick={() => leaveChat(activeChat._id)}
              onDeleteClick={() => deleteChat(activeChat._id)}
              onJoinClick={() => joinChat(activeChat._id)}
              /* eslint-enable no-underscore-dangle */
              disabled={!isConnected}
            />
          </Typography>
        </React.Fragment>
      ) : (
        <Typography variant="title" className={classes.appBarTitle}>
          DogeCodes React Chat
        </Typography>
      )}
      <UserMenu user={user} editUser={editUser} onLogout={onLogout} disabled={!isConnected} />
    </Toolbar>
  </AppBar>
);

ChatHeader.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  user: PropTypes.shape({
    username: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    isMember: PropTypes.bool.isRequired,
    isCreator: PropTypes.bool.isRequired,
    isChatMember: PropTypes.bool.isRequired,
  }).isRequired,
  editUser: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  activeChat: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    creator: PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }).isRequired,
    members: PropTypes.arrayOf(PropTypes.object).isRequired,
  }),
  leaveChat: PropTypes.func.isRequired,
  deleteChat: PropTypes.func.isRequired,
  joinChat: PropTypes.func.isRequired,
  isConnected: PropTypes.bool.isRequired,
};

ChatHeader.defaultProps = {
  activeChat: null,
};

export default withStyles(styles)(ChatHeader);
