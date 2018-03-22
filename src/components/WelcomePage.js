import React from 'react';
import { Redirect } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const styles = theme => ({
	paper: {
		marginTop: 64 + theme.spacing.unit * 3,
		width: 500
	},
	tabContent: {
		padding: theme.spacing.unit * 3
	}
})


class WelcomePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTab: 0,
			error: props.error
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ error: nextProps.error });
	}

	handleTabChange = (event, value) => {
		this.setState({ activeTab: value, error: '' });
	}

	render() {
		const { classes, signup, login, isAuthenticated, isFetching } = this.props;
		const { activeTab, error } = this.state;

		if (isAuthenticated) {
			return <Redirect to="/chat" />
		}

		return (
			<React.Fragment>
				<AppBar>
					<Toolbar>
						<Typography variant="title" color="inherit" style={{ flex: 1 }}>
							DogeCodes React Chat
            		</Typography>
					</Toolbar>
				</AppBar>
				<Grid container justify="center">
					<Grid item>
						<Paper className={classes.paper} elevation={10}>
							<AppBar position="static" color="default">
								<Tabs
									value={activeTab}
									onChange={this.handleTabChange}
									fullWidth
								>
									<Tab label="Login" disabled={isFetching} />
									<Tab label="Signup" disabled={isFetching} />
								</Tabs>
							</AppBar>
							<div className={classes.tabContent}>
								{activeTab === 0 && <LoginForm onSubmit={login} error={error} isFetching={isFetching} />}
								{activeTab === 1 && <SignupForm onSubmit={signup} error={error} isFetching={isFetching} />}
							</div>
						</Paper>
					</Grid>
				</Grid>
			</React.Fragment>
		)
	}
}

export default withStyles(styles)(WelcomePage);
