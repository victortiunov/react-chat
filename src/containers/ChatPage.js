import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchAllChats, fetchMyChats, setActiveChat, createChat, recieveAuth, editUser, logout } from '../actions';
import * as fromChats from '../reducers/chats';
import ChatPage from '../components/ChatPage';

const mapStateToProps = state => {
	return {
		myChats: fromChats.getByIds(state.chats, state.chats.myIds),
		allChats: fromChats.getByIds(state.chats, state.chats.allIds),
		user: state.auth.user
	}
};

const mapDispatchToProps = dispatch => bindActionCreators({
	fetchAllChats, fetchMyChats, setActiveChat, createChat, recieveAuth, editUser, logout
}, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChatPage);
