import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ChatPage from './ChatPage';
import WelcomePage from './WelcomePage';

const App = () => (
	<Router>
		<Switch>
			<Route exact path="/" component={WelcomePage} />
			<Route path="/chat" component={ChatPage} />
			<Redirect to="/" />
		</Switch>
	</Router>
);

export default App;
