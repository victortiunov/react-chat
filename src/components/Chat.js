import React from 'react';
import { withStyles } from 'material-ui/styles'
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
	}
});

const Chat = ({ classes, user, activeChat, sendMessage, joinChat, isConnected }) => (
	<main className={classes.chatLayout}>
		{activeChat ? (
			<React.Fragment>
				<ChatMessageList
					user={user}
					messages={activeChat.messages}
				/>
				<MessageInput
					sendMessage={sendMessage}
					user={user}
					onJoinClick={() => joinChat(activeChat._id)}
					disabled={!isConnected}
				/>
			</React.Fragment>
		) : (
			<Paper className={classes.info}>
				<Typography variant="body1" gutterBottom>
					Plase select a chat to start messaging…
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

export default withStyles(styles)(Chat);
