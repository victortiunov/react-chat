import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui';
import Sidebar from './Sidebar';
import ChatHeader from './ChatHeader';
import Chat from './Chat';
import ErrorMessage from './ErrorMessage';

const styles = theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.default,
  },
});

class ChatPage extends React.Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    activeChat: PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }),
    myChats: PropTypes.arrayOf(PropTypes.object).isRequired,
    allChats: PropTypes.arrayOf(PropTypes.object).isRequired,
    createChat: PropTypes.func.isRequired,
    leaveChat: PropTypes.func.isRequired,
    deleteChat: PropTypes.func.isRequired,
    joinChat: PropTypes.func.isRequired,
    setActiveChat: PropTypes.func.isRequired,
    sendMessage: PropTypes.func.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      isMember: PropTypes.bool.isRequired,
      isCreator: PropTypes.bool.isRequired,
      isChatMember: PropTypes.bool.isRequired,
    }).isRequired,
    editUser: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    error: PropTypes.string,
    isConnected: PropTypes.bool.isRequired,
    recieveAuth: PropTypes.func.isRequired,
    fetchAllChats: PropTypes.func.isRequired,
    fetchMyChats: PropTypes.func.isRequired,
    socketsConnect: PropTypes.func.isRequired,
    mountChat: PropTypes.func.isRequired,
    unmountChat: PropTypes.func.isRequired,
  };

  static defaultProps = {
    activeChat: null,
    error: '',
  };

  componentDidMount() {
    const {
      recieveAuth, fetchAllChats, fetchMyChats, socketsConnect,
    } = this.props;

    Promise.all([recieveAuth(), fetchAllChats(), fetchMyChats()])
      .then(() => {
        socketsConnect();
      })
      .then(() => {
        this.props.myChats.forEach((chat) => {
          // eslint-disable-next-line
          this.props.mountChat(chat._id);
        });
      });
  }

  componentWillReceiveProps(nextProps) {
    /* eslint-disable no-underscore-dangle */
    const currentMyChats = this.props.myChats.map(chat => chat._id) || [];
    const nextMyChats = nextProps.myChats.map(chat => chat._id) || [];
    /* eslint-enable no-underscore-dangle */

    currentMyChats.filter(id => !nextMyChats.includes(id)).forEach((id) => {
      this.props.unmountChat(id);
    });

    nextMyChats.filter(id => !currentMyChats.includes(id)).forEach((id) => {
      this.props.mountChat(id);
    });
  }

  render() {
    const {
      classes,
      activeChat,
      myChats,
      allChats,
      createChat,
      leaveChat,
      deleteChat,
      joinChat,
      setActiveChat,
      sendMessage,
      user,
      editUser,
      logout,
      error,
      isConnected,
    } = this.props;

    return (
      <div className={classes.root}>
        <ChatHeader
          isConnected={isConnected}
          user={user}
          editUser={editUser}
          onLogout={logout}
          activeChat={activeChat}
          leaveChat={leaveChat}
          deleteChat={deleteChat}
          joinChat={joinChat}
        />
        <Sidebar
          isConnected={isConnected}
          activeChat={activeChat}
          myChats={myChats}
          allChats={allChats}
          createChat={createChat}
          setActiveChat={setActiveChat}
        />
        <Chat
          isConnected={isConnected}
          user={user}
          activeChat={activeChat}
          sendMessage={sendMessage}
          joinChat={joinChat}
        />
        <ErrorMessage error={error} />
      </div>
    );
  }
}

export default withStyles(styles)(ChatPage);
