import React from 'react';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import MoreIcon from 'material-ui-icons/MoreVert';

class ChatMenu extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			menuElement: null
		}
	}

	handleClick = (e) => {
		this.setState({ menuElement: e.currentTarget });
	};

	handleClose = () => {
		this.setState({ menuElement: null });
	};

	handleLeaveClick = () => {
		this.handleClose();
		this.props.onLeaveClick();
	};

	handleDeleteClick = () => {
		this.handleClose();
		this.props.onDeleteClick();
	};

	render() {
		const { user, disabled } = this.props;
		const { menuElement } = this.state;

		if (!user.isChatMember) {
			return null;
		}

		return (
			<React.Fragment>
				<IconButton
					color="inherit"
					aria-owns={menuElement ? 'simple-menu' : null}
					aria-haspopup="true"
					disabled={disabled}
					onClick={this.handleClick}
				>
					<MoreIcon />
				</IconButton>
				<Menu
					id="simple-menu"
					anchorEl={menuElement}
					open={!!menuElement}
					onClose={this.handleClose}
				>
					{user.isMember && <MenuItem onClick={this.handleLeaveClick}>Leave</MenuItem>}
					{user.isCreator && <MenuItem onClick={this.handleDeleteClick}>Delete</MenuItem>}
				</Menu>
			</React.Fragment>
		);
	}
}

export default ChatMenu;
