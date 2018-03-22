import React from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Avatar from './Avatar';
import ChatMenu from './ChatMenu';
import UserMenu from './UserMenu';

const styles = theme => ({
	appBar: {
		position: 'fixed',
		width: `calc(100% - 320px)`,
	},
	appBarTitle: {
		flex: 1,
		marginLeft: theme.spacing.unit * 2,
		marginRight: theme.spacing.unit * 2,
		color: theme.palette.secondary.contrastText,
	}
});

class ChatHeader extends React.Component {
	render() {
		const { classes, user, editUser, onLogout, activeChat, leaveChat, deleteChat, isConnected } = this.props;

		return (
			< AppBar color="primary" className={classes.appBar} >
				<Toolbar>
					{activeChat ? (
						<React.Fragment>
							<Avatar colorFrom={activeChat._id}>{activeChat.title}</Avatar>
							<Typography variant="title" className={classes.appBarTitle}>
								{activeChat.title}
								<ChatMenu
									user={user}
									onLeaveClick={() => leaveChat(activeChat._id)}
									onDeleteClick={() => deleteChat(activeChat._id)}
									disabled={!isConnected}
								/>
							</Typography>
						</React.Fragment>
					) : (
						<Typography variant="title" className={classes.appBarTitle}>
							DogeCodes React Chat
						</Typography>
					)}
					<UserMenu user={user} editUser={editUser} onLogout={onLogout} disabled={!isConnected} />
				</Toolbar>
			</AppBar >
		)
	}
}

export default withStyles(styles)(ChatHeader);
