import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { recieveAuth, logout } from '../actions/auth';
import { fetchAllChats, fetchMyChats, setActiveChat, createChat, leaveChat, deleteChat, joinChat } from '../actions/chats';
import { sendMessage, mountChat, unmountChat, socketsConnect } from '../actions/sockets';
import { editUser } from '../actions/users';
import * as fromChats from '../reducers/chats';
import * as fromState from '../reducers';
import ChatPage from '../components/ChatPage';

const mapStateToProps = (state) => {
	const activeChat = fromChats.getById(state.chats, state.chats.activeId);

	return {
		activeChat,
		myChats: fromChats.getByIds(state.chats, state.chats.myIds),
		allChats: fromChats.getByIds(state.chats, state.chats.allIds),
		user: {
			...state.auth.user,
			isMember: fromState.isMember(state, activeChat),
			isCreator: fromState.isCreator(state, activeChat),
			isChatMember: fromState.isChatMember(state, activeChat),
		},
		error: state.services.errors.chat,
		isConnected: state.services.isConnected,
	};
};

const mapDispatchToProps = dispatch => bindActionCreators({
	fetchAllChats,
	fetchMyChats,
	setActiveChat,
	createChat,
	leaveChat,
	deleteChat,
	joinChat,
	recieveAuth,
	editUser,
	logout,
	sendMessage,
	mountChat,
	unmountChat,
	socketsConnect,
}, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ChatPage);
