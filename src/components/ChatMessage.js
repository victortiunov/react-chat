import React from 'react';
import classnames from 'classnames';
import moment from 'moment';
import { withStyles } from 'material-ui';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Avatar from './Avatar';

import userName from '../utils/user-name';
import getColor from '../utils/color-from';

const styles = theme => ({
	messageWrapper: {
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: 'center',
		padding: `${theme.spacing.unit}px ${theme.spacing.unit * 3}px`,
	},
	messageWrappperFromMe: {
		justifyContent: 'flex-end',
	},
	message: {
		maxWidth: '70%',
		minWidth: '10%',
		padding: theme.spacing.unit,
		marginLeft: theme.spacing.unit * 2,
	},
	messageFromMe: {
		marginRight: theme.spacing.unit * 2,
		backgroundColor: '#e6dcff',
	},
	statusMessage: {
		justifyContent: 'center',
	},
	statusMessageUser: {
		display: 'inline',
	},
});

const ChatMessage = ({
	classes, user, sender, content, createdAt, statusMessage,
}) => {
	// eslint-disable-next-line
	const isMessageFromMe = sender._id === user._id;
	const senderName = userName(sender.username, sender.firstName, sender.lastName);

	if (statusMessage) {
		return (
			<div className={classnames(classes.messageWrapper, classes.statusMessage)}>
				<Typography
					className={classes.statusMessageUser}
					style={{ color: getColor(senderName) }}
				>
					{senderName}
				</Typography>
				&nbsp;
				<Typography variant="caption">
					{content} {moment(createdAt).fromNow()}
				</Typography>
			</div>
		);
	}

	const userAvatar = (
		<Avatar colorFrom={senderName}>
			{senderName}
		</Avatar>
	);

	return (
		<div className={classnames(
			classes.messageWrapper,
			isMessageFromMe && classes.messageWrappperFromMe,
		)}
		>
			{!isMessageFromMe && userAvatar}
			<Paper className={classnames(
				classes.message,
				isMessageFromMe && classes.messageFromMe,
			)}
			>
				<Typography variant="caption">
					{senderName}
				</Typography>
				<Typography variant="body1">
					{content}
					<Typography variant="caption" component="span">
						{moment(createdAt).fromNow()}
					</Typography>
				</Typography>
			</Paper>
			{isMessageFromMe && userAvatar}
		</div>
	);
};

export default withStyles(styles)(ChatMessage);
