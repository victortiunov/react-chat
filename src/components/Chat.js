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
		overflow: 'hidden',
	},
});

class Chat extends React.Component {
	render() {
		const { classes, activeChat, sendMessage } = this.props;

		return (
			<main className={classes.chatLayout}>
				<ChatMessageList messages={(activeChat ? activeChat.messages : [])} />
				<MessageInput sendMessage={(message) => sendMessage(activeChat._id, message)} />
			</main>
		);
	}
}

export default withStyles(styles)(Chat);
