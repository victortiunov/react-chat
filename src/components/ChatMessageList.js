import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ChatMessage from './ChatMessage';

const styles = theme => ({
  messagesWrapper: {
    overflowY: 'scroll',
    height: 'calc(100% - 60px)',
    width: '100%',
    paddingTop: theme.spacing.unit * 3,
    marginBottom: '70px',
  },
});

class ChatMessageList extends React.Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    messages: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      chatId: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      sender: PropTypes.PropTypes.shape({
        _id: PropTypes.string.isRequired,
        username: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
      }).isRequired,
      createdAt: PropTypes.string.isRequired,
    })),
    user: PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    messages: [],
  };

  componentDidMount() {
    this.scrollDownHistory();
  }

  componentDidUpdate() {
    this.scrollDownHistory();
  }

  scrollDownHistory() {
    if (this.messagesWrapper) {
      this.messagesWrapper.scrollTop = this.messagesWrapper.scrollHeight;
    }
  }

  render() {
    const { classes, user, messages } = this.props;

    return (
      <div
        className={classes.messagesWrapper}
        ref={(wrapper) => {
          this.messagesWrapper = wrapper;
        }}
      >
        {messages &&
          messages.map(message => (
            // eslint-disable-next-line
            <ChatMessage key={message._id} user={user} {...message} />
          ))}
      </div>
    );
  }
}

export default withStyles(styles)(ChatMessageList);
