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
		const { recieveAuth, fetchAllChats, fetchMyChats } = this.props;

		Promise.all([
			recieveAuth(),
			fetchAllChats(),
			fetchMyChats()
		]);
	}

	render() {
		const { classes, activeChat, myChats, allChats, createChat, sendMessage, setActiveChat, user, editUser, logout } = this.props;

		return (
			<div className={classes.root}>
				<ChatHeader user={user} editUser={editUser} onLogout={logout} />
				<Sidebar myChats={myChats} allChats={allChats} createChat={createChat} setActiveChat={setActiveChat} />
				<Chat user={user} activeChat={activeChat} sendMessage={sendMessage} />
			</div>
		)
	}
}

export default withStyles(styles) (ChatPage);
