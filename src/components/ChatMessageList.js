import React from 'react';
import { withStyles } from 'material-ui/styles';
import ChatMessage from './ChatMessage';

const styles = theme => ({
	messagesWrapper: {
		overflowX: 'scroll',
		height: `calc(100% - 60px)`,
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
		const messagesWrapper = this.refs.messagesWrapper;
		if (messagesWrapper) {
			messagesWrapper.scrollTop = messagesWrapper.scrollHeight;
		}
	}

	render() {
		const { classes, messages } = this.props;

		return (
			<div className={classes.messagesWrapper} ref="messagesWrapper">
				{messages && messages.map((message) => (
					<ChatMessage key={message._id} {...message} />
				))}
			</div>
		);
	}
}

export default withStyles(styles)(ChatMessageList);
