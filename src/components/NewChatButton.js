import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Modal from 'material-ui/Modal';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';

const styles = theme => ({
	newChatButton: {
		position: 'absolute',
		left: 'auto',
		right: theme.spacing.unit * 3,
		bottom: theme.spacing.unit * 3 + 48, // + bottom navigation
	},
	modalDialog: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	modalForm: {
		width: '30%',
		minWidth: '300px',
		padding: theme.spacing.unit * 3,
		backgroundColor: theme.palette.background.paper
	}
});

class NewChatButton extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			modalView: false,
			chatTitle: {
				value: '',
				isValid: true
			}
		}
	}

	toggleModal = () => {
		this.setState({ modalView: !this.state.modalView });
	}

	handleTitleChange = (e) => {
		this.setState({
			chatTitle: {
				value: e.target.value,
				isValid: true,
			},
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();

		const { chatTitle } = this.state;

		if (!chatTitle.value) {
			this.setState({
				chatTitle: {
					value: chatTitle.value,
					isValid: false,
				},
			});

			return;
		}

		this.props.createChat(chatTitle.value);
		
		this.toggleModal();
		this.setState({
			chatTitle: {
				value: '',
				isValid: true,
			},
		});
	}

	render() {
		const { classes, disabled } = this.props;
		const { modalView, chatTitle } = this.state;

		return (
			<React.Fragment>
				<Button
					variant="fab"
					color="primary"
					className={classes.newChatButton}
					onClick={this.toggleModal}
					disabled={disabled}
				>
					<AddIcon />
				</Button>
				<Modal
					className={classes.modalDialog}
					open={modalView}
					onClose={this.toggleModal}
				>
					<form
						className={classes.modalForm}
						onSubmit={this.handleSubmit}
					>
						<Typography variant="title" id="modal-title">
							Create new chat
            		</Typography>
						<TextField
							required
							fullWidth
							autoFocus
							label="New chat title"
							placeholder="Type here the title..."
							type="text"
							margin="normal"
							autoComplete="new-chat"
							value={chatTitle.value}
							onChange={this.handleTitleChange}
							error={!chatTitle.isValid}
						/>
						<Button
							variant="raised"
							type="submit"
							color="primary"
						>
							Create
            		</Button>
					</form>
				</Modal>
			</React.Fragment>
		)
	}
}

export default withStyles(styles)(NewChatButton);
