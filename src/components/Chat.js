import React from 'react';
import { withStyles } from 'material-ui/styles'
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
	}
});

class Chat extends React.Component {
	render() {
		const { classes, user, activeChat, sendMessage, joinChat } = this.props;

		return (
			<main className={classes.chatLayout}>
				{ activeChat ? (
					<React.Fragment>
						<ChatMessageList user={user} messages={activeChat.messages} />
						<MessageInput sendMessage={(message) => sendMessage(activeChat._id, message)} user={user} onJoinClick={() => joinChat(activeChat._id)} />
					</React.Fragment>
				) : (
					<div></div>
				)}
			</main>
		);
	}
}

export default withStyles(styles)(Chat);
