import React from 'react';
import { withStyles } from 'material-ui';
import IconButton from 'material-ui/IconButton';
import Avatar from './Avatar';
import Menu, { MenuItem } from 'material-ui/Menu';
import Modal from 'material-ui/Modal';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

const styles = theme => ({
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

class UserMenu extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			menuElement: null,
			login: props.user.username,
			firstName: props.user.firstName,
			lastName: props.user.lastName,
			modalView: false
		}
	}

	handleClick = (e) => {
		this.setState({ menuElement: e.currentTarget });
	}

	handleClose = () => {
		this.setState({ menuElement: null });
	}

	toggleModal = () => {
		this.handleClose();
		this.setState({ modalView: !this.state.modalView });
	}

	handleInputChange = (event) => {
		event.persist();
		const { name, value } = event.target;

		this.setState((prevState) => ({
			[name]: {
				...prevState[name],
				value
			}
		}));
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.toggleModal();
	}

	render() {
		const { classes } = this.props;
		const { menuElement, login, firstName, lastName, modalView } = this.state;
		const name = (firstName || lastName) ? (firstName + ' ' + lastName) : login;

		return (
			<React.Fragment>
				<IconButton
					aria-owns={menuElement ? 'user-menu' : null}
					aria-haspopup="true"
					onClick={this.handleClick}
				>
					<Avatar colorFrom={name}>{name}</Avatar>
				</IconButton>
				<Menu
					id="user-menu"
					anchorEl={menuElement}
					open={!!menuElement}
					onClose={this.handleClose}
				>
					<MenuItem onClick={this.toggleModal}>Edit Profile</MenuItem>
					<MenuItem onClick={this.handleLogout}>Logout</MenuItem>
				</Menu>
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
							Edit profile
            		</Typography>
						<TextField
							required
							fullWidth
							label="Username"
							placeholder="Enter your username..."
							type="text"
							margin="normal"
							autoComplete="username"
							name="login"
							value={login}
							onChange={this.handleInputChange}
							error={!login}
						/>
						<TextField
							fullWidth
							autoFocus
							label="First name"
							placeholder="Enter your first name..."
							type="text"
							margin="normal"
							autoComplete="firstName"
							name="firstName"
							value={firstName}
							onChange={this.handleInputChange}
							error={!firstName}
						/>
						<TextField
							fullWidth
							label="Last name"
							placeholder="Enter your second name..."
							type="text"
							margin="normal"
							autoComplete="username"
							name="lastName"
							value={lastName}
							onChange={this.handleInputChange}
							error={!lastName}
						/>
						<Button
							variant="raised"
							type="submit"
							color="primary"
						>
							Save
            		</Button>
					</form>
				</Modal>
			</React.Fragment>
		);
	}
}

export default withStyles(styles)(UserMenu);