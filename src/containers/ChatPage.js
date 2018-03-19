import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchAllChats, fetchMyChats, setActiveChat, createChat, leaveChat, deleteChat, joinChat, sendMessage, recieveAuth, editUser, logout } from '../actions';
import * as fromChats from '../reducers/chats';
import * as fromState from '../reducers';
import ChatPage from '../components/ChatPage';

const mapStateToProps = state => {
	const activeChat = fromChats.getById(state.chats, state.chats.activeId);

	return {
		activeChat: activeChat,
		myChats: fromChats.getByIds(state.chats, state.chats.myIds),
		allChats: fromChats.getByIds(state.chats, state.chats.allIds),
		user: {
			...state.auth.user,
			isMember: fromState.isMember(state, activeChat),
			isCreator: fromState.isCreator(state, activeChat),
			isChatMember: fromState.isChatMember(state, activeChat)
		}
	}
};

const mapDispatchToProps = dispatch => bindActionCreators({
	fetchAllChats, fetchMyChats, setActiveChat, createChat, leaveChat, deleteChat, joinChat, sendMessage, recieveAuth, editUser, logout
}, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChatPage);
