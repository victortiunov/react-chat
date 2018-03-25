import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import { LinearProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';

const styles = theme => ({
  errorMessage: {
    color: 'red',
  },
  signUpButton: {
    marginTop: theme.spacing.unit * 2,
  },
});

class LoginForm extends React.Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    error: PropTypes.string,
    isFetching: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    error: '',
  };

  state = {
    username: {
      value: '',
      isValid: true,
    },
    password: {
      value: '',
      isValid: true,
    },
  };

  handleInputChange = (event) => {
    event.persist();
    const { name, value } = event.target;

    this.setState(prevState => ({
      [name]: {
        ...prevState[name],
        value,
      },
    }));
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { username, password } = this.state;

    this.props.onSubmit(username.value, password.value);
  };
  render() {
    const { classes, error, isFetching } = this.props;
    const { username, password } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          required
          fullWidth
          label="Username"
          placeholder="Input your username..."
          type="text"
          name="username"
          margin="normal"
          autoComplete="username"
          value={username.value}
          onChange={this.handleInputChange}
          error={!username.isValid}
          disabled={isFetching}
        />
        <TextField
          required
          fullWidth
          label="Password"
          placeholder="Type your password..."
          type="password"
          name="password"
          margin="normal"
          autoComplete="current-password"
          value={password.value}
          onChange={this.handleInputChange}
          error={!password.isValid}
          disabled={isFetching}
        />
        {isFetching ? (
          <LinearProgress mode="indeterminate" />
        ) : (
          <Typography className={classes.errorMessage}>{error}</Typography>
        )}
        <Button
          fullWidth
          variant="raised"
          type="submit"
          color="primary"
          className={classes.signUpButton}
          disabled={isFetching}
        >
          Login
        </Button>
      </form>
    );
  }
}

export default withStyles(styles)(LoginForm);
