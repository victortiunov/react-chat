import React from 'react';
import { withStyles } from 'material-ui/styles';
import { Input, Grid, Button } from 'material-ui';
import SendIcon from 'material-ui-icons/Send';
import Paper from 'material-ui/Paper';

const styles = theme => ({
  messageInputWrapper: {
    position: 'fixed',
    left: 'auto',
    right: 0,
    bottom: 0,
    width: 'calc(100% - 320px)',
  },
  messageForm: {
    padding: theme.spacing.unit,
  },
  messageInput: {
    marginTop: 15,
  },
  joinPaper: {
    padding: theme.spacing.unit * 2,
  },
});

class MessageInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
    };
  }

  handleMessageChange = (e) => {
    this.setState({ message: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.message.trim()) {
      this.props.sendMessage(this.state.message);
      this.setState({ message: '' });
    }
  };

  render() {
    const {
      classes, user, onJoinClick, disabled,
    } = this.props;
    const { message } = this.state;

    return (
      <div className={classes.messageInputWrapper}>
        {user.isChatMember ? (
          <form className={classes.messageForm} onSubmit={this.handleSubmit}>
            <Grid container justify="center">
              <Grid item xs={8}>
                <Input
                  className={classes.messageInput}
                  fullWidth
                  value={message}
                  placeholder="Type your message…"
                  onChange={this.handleMessageChange}
                  disabled={disabled}
                />
              </Grid>
              <Grid item className={classes.messageButton}>
                <Button
                  className={classes.messageButton}
                  type="submit"
                  variant="fab"
                  color="primary"
                  disabled={disabled || !message.trim()}
                >
                  <SendIcon />
                </Button>
              </Grid>
            </Grid>
          </form>
        ) : (
          <Paper className={classes.joinPaper} elevation={6}>
            <Button
              fullWidth
              variant="raised"
              color="primary"
              onClick={onJoinClick}
              disabled={disabled}
            >
              Join the Chat to start messaging
            </Button>
          </Paper>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(MessageInput);
