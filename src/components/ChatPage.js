import React from 'react';
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
  componentDidMount() {
    const {
      recieveAuth, fetchAllChats, fetchMyChats, socketsConnect,
    } = this.props;

    Promise.all([recieveAuth(), fetchAllChats(), fetchMyChats()]).then(() => {
      socketsConnect();
    });
  }

  componentWillReceiveProps(nextProps) {
    const prevChat = this.props.activeChat;
    const nextChat = nextProps.activeChat;

    if (nextChat) {
      /* eslint-disable no-underscore-dangle */
      if (prevChat && prevChat._id !== nextChat._id) {
        this.props.unmountChat(prevChat._id);
      }
      this.props.mountChat(nextChat._id);
      /* eslint-enable no-underscore-dangle */
    }
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
