import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import { ListItemIcon, ListItemText } from 'material-ui/List';
import EditIcon from 'material-ui-icons/Edit';
import LogoutIcon from 'material-ui-icons/ExitToApp';
import Modal from 'material-ui/Modal';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Avatar from './Avatar';

import userName from '../utils/user-name';

const styles = theme => ({
  modalDialog: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalForm: {
    width: '30%',
    minWidth: '300px',
    padding: theme.spacing.unit * 3,
    backgroundColor: theme.palette.background.paper,
  },
});

class UserMenu extends React.Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    user: PropTypes.shape({
      username: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
    }).isRequired,
    disabled: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired,
    editUser: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      menuElement: null,
      user: {
        username: '',
        firstName: '',
        lastName: '',
      },
      avatarName: '',
      modalEdit: {
        username: '',
        firstName: '',
        lastName: '',
      },
      modalView: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { user } = nextProps;

    if (user) {
      this.setState({
        user: { ...user },
        avatarName: userName(user.username, user.firstName, user.lastName),
        modalEdit: { ...user },
      });
    }
  }

  handleClick = (e) => {
    this.setState({ menuElement: this.props.disabled ? null : e.currentTarget });
  };

  handleClose = () => {
    this.setState({ menuElement: null });
  };

  handleLogout = () => {
    this.handleClose();
    this.props.onLogout();
  };

  toggleModal = () => {
    this.handleClose();
    this.setState({
      modalView: !this.state.modalView,
      modalEdit: {
        ...this.state.user,
      },
    });
  };

  handleInputChange = (event) => {
    event.persist();
    const { name, value } = event.target;

    this.setState((prevState) => {
      const { modalEdit } = prevState;
      return {
        modalEdit: {
          ...modalEdit,
          [name]: value,
        },
      };
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.toggleModal();
    this.props.editUser(this.state.login, this.state.firstName, this.state.lastName);
  };

  render() {
    const { classes } = this.props;
    const { menuElement, modalView, avatarName } = this.state;
    const { username, firstName, lastName } = this.state.modalEdit;

    return (
      <React.Fragment>
        {avatarName && (
          <IconButton
            aria-owns={menuElement ? 'user-menu' : null}
            aria-haspopup="true"
            onClick={this.handleClick}
          >
            <Avatar colorFrom={avatarName}>{avatarName}</Avatar>
          </IconButton>
        )}
        <Menu id="user-menu" anchorEl={menuElement} open={!!menuElement} onClose={this.handleClose}>
          <MenuItem onClick={this.toggleModal}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText inset primary="Edit Profile" />
          </MenuItem>
          <MenuItem onClick={this.handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText inset primary="Logout" />
          </MenuItem>
        </Menu>
        <Modal className={classes.modalDialog} open={modalView} onClose={this.toggleModal}>
          <form className={classes.modalForm} onSubmit={this.handleSubmit}>
            <Typography variant="title" id="modal-title">
              Edit profile
            </Typography>
            <TextField
              required
              fullWidth
              label="Username"
              placeholder="Enter your username..."
              type="text"
              margin="normal"
              autoComplete="username"
              name="username"
              value={username}
              onChange={this.handleInputChange}
              error={!username}
            />
            <TextField
              fullWidth
              autoFocus
              label="First name"
              placeholder="Enter your first name..."
              type="text"
              margin="normal"
              autoComplete="firstName"
              name="firstName"
              value={firstName}
              onChange={this.handleInputChange}
            />
            <TextField
              fullWidth
              label="Last name"
              placeholder="Enter your second name..."
              type="text"
              margin="normal"
              autoComplete="username"
              name="lastName"
              value={lastName}
              onChange={this.handleInputChange}
            />
            <Button variant="raised" type="submit" color="primary" disabled={!username}>
              Save
            </Button>
          </form>
        </Modal>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(UserMenu);
