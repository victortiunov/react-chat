import React from 'react';
import { withStyles } from 'material-ui/styles';
import { Provider } from 'react-redux';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from '../containers/PrivateRoute';
import ChatPage from '../containers/ChatPage';
import WelcomePage from '../containers/WelcomePage';
import history from '../utils/history';
import configureStore from '../store';

const styles = theme => ({
	root: {
		position: 'relative',
		display: 'flex',
		width: '100%',
		height: '100%',
		backgroundColor: theme.palette.background.default
	}
});

const store = configureStore();

const App = () => (
	<Provider store={store}>
		<Router history={history}>
			<Switch>
				<Route exact path="/" component={WelcomePage} />
				<PrivateRoute path="/chat" component={ChatPage} />
				<Redirect to="/" />
			</Switch>
		</Router>
	</Provider>
);

export default withStyles(styles)(App);
