import React from 'react';
import { withStyles } from 'material-ui/styles';
import ChatMessage from './ChatMessage';

const styles = theme => ({
	messagesWrapper: {
		overflowY: 'scroll',
		height: 'calc(100% - 60px)',
		width: '100%',
		paddingTop: theme.spacing.unit * 3,
		marginBottom: '70px',
	},
});

class ChatMessageList extends React.Component {
	componentDidMount() {
		this.scrollDownHistory();
	}

	componentDidUpdate() {
		this.scrollDownHistory();
	}

	scrollDownHistory() {
		if (this.messagesWrapper) {
			this.messagesWrapper.scrollTop = this.messagesWrapper.scrollHeight;
		}
	}

	render() {
		const { classes, user, messages } = this.props;

		return (
			<div
				className={classes.messagesWrapper}
				ref={(wrapper) => { this.messagesWrapper = wrapper; }}
			>
				{messages && messages.map(message => (
					// eslint-disable-next-line
					<ChatMessage key={message._id} user={user} {...message} />
				))}
			</div>
		);
	}
}

export default withStyles(styles)(ChatMessageList);
