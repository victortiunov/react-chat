import React from 'react';
import { withStyles } from 'material-ui/styles';
//import Paper from 'material-ui/Paper';
import { Input, Grid, Button } from 'material-ui';
import SendIcon from 'material-ui-icons/Send';

const styles = theme => ({
	messageInputWrapper: {
		position: 'fixed',
		left: 'auto',
		right: 0,
		bottom: 0,
		width: `calc(100% - 320px)`
	},
	messageForm: {
		padding: theme.spacing.unit
	},
	messageInput: {
		marginTop: 15
	}
});

class MessageInput extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			message: ''
		}
	}

	handleMessageChange = (e) => {
		this.setState({ message: e.target.value });
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.sendMessage(this.state.message);
		this.setState({ message: '' });
	}

	render() {
		const { classes } = this.props;
		const { message } = this.state;

		return (
			<div className={classes.messageInputWrapper}>
				<form
					className={classes.messageForm}
					onSubmit={this.handleSubmit}
				>
					<Grid container justify="center">
						<Grid item xs={8}>
							<Input
								className={classes.messageInput}
								fullWidth
								value={message}
								placeholder="Type your message…"
								onChange={this.handleMessageChange}
							/>
						</Grid>
						<Grid item className={classes.messageButton}>
						<Button
							className={classes.messageButton}
							type="submit"
							variant="fab"
							color="primary"
						>
							<SendIcon/>
						</Button>
						</Grid>
					</Grid>
				</form>
			</div>
		);
	}
}

export default withStyles(styles)(MessageInput);
