import React from 'react';
import { withStyles } from 'material-ui/styles';
import { ListItem, ListItemText } from 'material-ui/List';
import Avatar from './Avatar';

const styles = theme => ({});

class ChatListItem extends React.Component {
	render() {
		const title = this.props.title ? this.props.title : "No Title";

		return(
			<ListItem button>
				<Avatar colorFrom={title}>{title}</Avatar>
				<ListItemText primary={title} />
			</ListItem>
		);
	}
}

export default withStyles(styles)(ChatListItem);
