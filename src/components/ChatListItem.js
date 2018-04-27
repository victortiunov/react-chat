import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from 'material-ui/styles';
import { ListItem, ListItemText, ListItemIcon } from 'material-ui/List';
import Icon from 'material-ui-icons/Mail';
import Avatar from './Avatar';

const styles = () => ({
  activeChat: {
    backgroundColor: 'lightcyan',
  },
  newMessage: {
    color: '#64B5F6',
  },
});

class ChatListItem extends React.Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    isActive: PropTypes.bool.isRequired,
    unreadMessages: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  handleClick = () => {
    this.props.onClick();
  };

  render() {
    const title = this.props.title ? this.props.title : 'No Title';
    const {
      classes, disabled, isActive, unreadMessages,
    } = this.props;

    return (
      <ListItem
        divider
        className={classnames(isActive && classes.activeChat)}
        style={{ cursor: 'pointer' }}
        onClick={this.handleClick}
        disabled={disabled}
      >
        <Avatar colorFrom={title}>{title}</Avatar>
        <ListItemText primary={title} />
        {unreadMessages && (
          <ListItemIcon>
            <Icon className={classes.newMessage} />
          </ListItemIcon>
        )}
      </ListItem>
    );
  }
}

export default withStyles(styles)(ChatListItem);
