import React from 'react';
import { withStyles } from 'material-ui';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import { LinearProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';

const styles = theme => ({
	errorMessage: {
		color: 'red'
	},
	signUpButton: {
		marginTop: theme.spacing.unit * 2,
	}
})

class SignupForm extends React.Component {
	state = {
		username: {
			value: '',
			isValid: true,
		},
		password: {
			value: '',
			isValid: true,
		},
		repeatedPassword: {
			value: '',
			isValid: true,
		},
	}

	validate = () => {
		const { password, repeatedPassword } = this.state;
		const isValid = password.value === repeatedPassword.value;

		this.setState({
			password: { ...password, isValid },
			repeatedPassword: { ...repeatedPassword, isValid },
		});

		return isValid;
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

	handleSubmit = (event) => {
		event.preventDefault();

		if (!this.validate()) {
			return;
		}

		const { username, password } = this.state;

		this.props.onSubmit(username.value, password.value);
	}

	render() {
		const { classes, error, isFetching } = this.props;
		const { username, password, repeatedPassword } = this.state;

		return (
			<form onSubmit={this.handleSubmit}>
				<TextField
					required
					fullWidth
					label="Username"
					placeholder="Input your username..."
					type="text"
					name="username"
					margin="normal"
					autoComplete="username"
					value={username.value}
					onChange={this.handleInputChange}
					error={!username.isValid}
					disabled={isFetching}
				/>
				<TextField
					required
					fullWidth
					label="Password"
					placeholder="Type your password..."
					type="password"
					name="password"
					margin="normal"
					autoComplete="new-password"
					value={password.value}
					onChange={this.handleInputChange}
					error={!password.isValid}
					disabled={isFetching}
				/>
				<TextField
					required
					fullWidth
					label="Repeat password"
					placeholder="Repeat your password..."
					type="password"
					name="repeatedPassword"
					margin="normal"
					autoComplete="new-password"
					value={repeatedPassword.value}
					onChange={this.handleInputChange}
					error={!repeatedPassword.isValid}
					disabled={isFetching}
				/>
				{ isFetching ? <LinearProgress mode="indeterminate" /> : <Typography className={classes.errorMessage}>{error}</Typography> }
				<Button
					fullWidth
					variant="raised"
					type="submit"
					color="primary"
					className={classes.signUpButton}
					disabled={isFetching}
				>
					Signup
        		</Button>
			</form>
		);
	}
}

export default withStyles(styles)(SignupForm);
