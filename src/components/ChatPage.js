import React from 'react';
import { withStyles } from 'material-ui';
import Sidebar from './Sidebar';
import ChatHeader from './ChatHeader';
import Chat from './Chat';

const styles = theme => ({
	root: {
		position: 'relative',
		display: 'flex',
		width: '100%',
		height: '100%',
		backgroundColor: theme.palette.background.default
	}
});

class ChatPage extends React.Component {
	componentDidMount() {
		const { recieveAuth, fetchAllChats, fetchMyChats, socketsConnect } = this.props;

		Promise.all([
			recieveAuth(),
			fetchAllChats(),
			fetchMyChats()
		])
			.then(() => {
				socketsConnect();
			});
	}

	componentWillReceiveProps(nextProps) {
		const prevChat = this.props.activeChat;
		const nextChat = nextProps.activeChat;
		
		if (nextChat) {
			if (prevChat && prevChat._id !== nextChat._id) {
				this.props.unmountChat(prevChat._id)
			}
			this.props.mountChat(nextChat._id);
		}
	}

	render() {
		const { classes, activeChat, myChats, allChats, createChat, leaveChat, deleteChat, joinChat, sendMessage, setActiveChat, user, editUser, logout } = this.props;

		return (
			<div className={classes.root}>
				<ChatHeader user={user} editUser={editUser} onLogout={logout} activeChat={activeChat} leaveChat={leaveChat} deleteChat={deleteChat} />
				<Sidebar myChats={myChats} allChats={allChats} createChat={createChat} setActiveChat={setActiveChat} />
				<Chat user={user} activeChat={activeChat} sendMessage={sendMessage} joinChat={joinChat} />
			</div>
		)
	}
}

export default withStyles(styles) (ChatPage);
