import React from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import UserMenu from './UserMenu';

// mock data
const user = {
	username: 'test_user',
	firstName: '',
	lastName: ''
}

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

const ChatHeader = ({ classes }) => (
	< AppBar color="primary" className={classes.appBar} >
		<Toolbar>
			<Typography variant="title" className={classes.appBarTitle}>
				DogeCodes React Chat
         </Typography>
			<UserMenu user={user}/>
		</Toolbar>
	</AppBar >
);

export default withStyles(styles)(ChatHeader);
