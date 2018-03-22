import React from 'react';
import { withStyles } from 'material-ui/styles';
import { ListItem, ListItemText } from 'material-ui/List';
import Avatar from './Avatar';

const styles = theme => ({});

class ChatListItem extends React.Component {
	handleClick = () => {
		this.props.onClick();
	}

	render() {
		const title = this.props.title ? this.props.title : "No Title";
		const { disabled } = this.props;

		return(
			<ListItem
				button
				onClick={this.handleClick}
				disabled={disabled}
			>
				<Avatar colorFrom={title}>{title}</Avatar>
				<ListItemText primary={title} />
			</ListItem>
		);
	}
}

export default withStyles(styles)(ChatListItem);
