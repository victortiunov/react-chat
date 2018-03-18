import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchAllChats, fetchMyChats, setActiveChat, createChat } from '../actions/chats';
import * as fromChats from '../reducers/chats';
import ChatPage from '../components/ChatPage';

const mapStateToProps = state => ({
	chats: fromChats.getByIds(state.chats, state.chats.allIds)
});

const mapDispatchToProps = dispatch => bindActionCreators({
	fetchAllChats, fetchMyChats, setActiveChat, createChat
}, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChatPage);