import React from 'react';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import ChatList from './ChatList';
import NewChatButton from './NewChatButton';
import RestoreIcon from 'material-ui-icons/Restore';
import ExploreIcon from 'material-ui-icons/Explore';

const styles = theme => ({
	drawerPaper: {
		position: 'relative',
		height: '100%',
		width: 320,
	},
	drawerHeader: {
		...theme.mixins.toolbar,
		paddingLeft: theme.spacing.unit * 3,
		paddingRight: theme.spacing.unit * 3,
	}
});

class Sidebar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTab: 0,
			searchTitle: ''
		}
	}

	handleTabChange = (e, value) => {
		this.setState({ activeTab: value, searchTitle: '' });
	}

	handleSearchTitleChange = (e) => {
		this.setState({ searchTitle: e.target.value });
	}

	getChats = () => {
		const searchTitle = this.state.searchTitle.toUpperCase();
		const chats = this.state.activeTab === 0 ? this.props.myChats : this.props.allChats;

		return chats.filter(chat => chat.title.toUpperCase().includes(searchTitle));
	}

	render() {
		const { activeTab, searchTitle } = this.state;
		const { classes, createChat, setActiveChat } = this.props;

		return (
			<Drawer
				variant="permanent"
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<div className={classes.drawerHeader}>
					<TextField
						fullWidth
						margin="normal"
						value={searchTitle}
						placeholder="Search chats..."
						onChange={this.handleSearchTitleChange}
					/>
				</div>
				<Divider />
				<ChatList chats={this.getChats()} setActiveChat={setActiveChat} />
				<NewChatButton createChat={createChat} />
				<BottomNavigation value={activeTab} onChange={this.handleTabChange} showLabels>
					<BottomNavigationAction label="My Chats" icon={<RestoreIcon />} />
					<BottomNavigationAction label="Explore" icon={<ExploreIcon />} />
				</BottomNavigation>
			</Drawer>
		);
	}
}

export default withStyles(styles)(Sidebar);
