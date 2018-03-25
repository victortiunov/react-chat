import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import { ListItemIcon, ListItemText } from 'material-ui/List';
import MoreIcon from 'material-ui-icons/MoreVert';
import LeaveIcon from 'material-ui-icons/ExitToApp';
import DeleteIcon from 'material-ui-icons/Delete';

class ChatMenu extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      username: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      isMember: PropTypes.bool.isRequired,
      isCreator: PropTypes.bool.isRequired,
      isChatMember: PropTypes.bool.isRequired,
    }).isRequired,
    disabled: PropTypes.bool.isRequired,
    onLeaveClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      menuElement: null,
    };
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
          {user.isMember && (
            <MenuItem onClick={this.handleLeaveClick}>
              <ListItemIcon>
                <LeaveIcon />
              </ListItemIcon>
              <ListItemText inset primary="Leave chat" />
            </MenuItem>
          )}
          {user.isCreator && (
            <MenuItem onClick={this.handleDeleteClick}>
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText inset primary="Delete chat" />
            </MenuItem>
          )}
        </Menu>
      </React.Fragment>
    );
  }
}

export default ChatMenu;
