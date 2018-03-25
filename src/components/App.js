import React from 'react';
import { withStyles } from 'material-ui/styles';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from '../containers/PrivateRoute';
import ChatPage from '../containers/ChatPage';
import WelcomePage from '../containers/WelcomePage';
import history from '../utils/history';

const styles = theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.default,
  },
});

const App = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={WelcomePage} />
      <PrivateRoute path="/chat" component={ChatPage} />
      <Redirect to="/" />
    </Switch>
  </Router>
);

export default withStyles(styles)(App);
