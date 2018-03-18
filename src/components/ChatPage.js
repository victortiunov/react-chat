import React from 'react';
import { withStyles } from 'material-ui';
import Sidebar from './Sidebar';
import ChatHeader from './ChatHeader';
import Chat from './Chat';

import { messages } from '../mock-data';

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
		const { fetchAllChats, fetchMyChats } = this.props;

		Promise.all([
			fetchAllChats(),
			fetchMyChats()
		]);
	}

	render() {
		const { classes, chats, createChat, logout } = this.props;

		return (
			<div className={classes.root}>
				<ChatHeader onLogout={logout}/>
				<Sidebar chats={chats} createChat={createChat}/>
				<Chat messages={messages} />
			</div>
		)
	}
}

export default withStyles(styles) (ChatPage);
