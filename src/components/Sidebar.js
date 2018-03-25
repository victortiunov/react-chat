import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import MyChatsIcon from 'material-ui-icons/Person';
import GlobalIcon from 'material-ui-icons/Public';
import ChatList from './ChatList';
import NewChatButton from './NewChatButton';

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
  },
});

class Sidebar extends React.Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    activeChat: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      creator: PropTypes.shape({
        _id: PropTypes.string.isRequired,
      }).isRequired,
      members: PropTypes.arrayOf(PropTypes.object).isRequired,
    }),
    myChats: PropTypes.arrayOf(PropTypes.object).isRequired,
    allChats: PropTypes.arrayOf(PropTypes.object).isRequired,
    createChat: PropTypes.func.isRequired,
    setActiveChat: PropTypes.func.isRequired,
    isConnected: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    activeChat: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      searchTitle: '',
    };
  }

  getChats = () => {
    const searchTitle = this.state.searchTitle.toUpperCase();
    const chats = this.state.activeTab === 0 ? this.props.myChats : this.props.allChats;

    return chats.filter(chat => chat.title.toUpperCase().includes(searchTitle));
  };

  handleSearchTitleChange = (e) => {
    this.setState({ searchTitle: e.target.value });
  };

  handleTabChange = (e, value) => {
    this.setState({ activeTab: value, searchTitle: '' });
  };

  render() {
    const { activeTab, searchTitle } = this.state;
    const {
      classes, activeChat, createChat, setActiveChat, isConnected,
    } = this.props;

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
        <ChatList
          activeChat={activeChat}
          chats={this.getChats()}
          setActiveChat={setActiveChat}
          disabled={!isConnected}
        />
        <NewChatButton createChat={createChat} disabled={!isConnected} />
        <BottomNavigation value={activeTab} onChange={this.handleTabChange} showLabels>
          <BottomNavigationAction label="My Chats" icon={<MyChatsIcon />} />
          <BottomNavigationAction label="Global" icon={<GlobalIcon />} />
        </BottomNavigation>
      </Drawer>
    );
  }
}

export default withStyles(styles)(Sidebar);
