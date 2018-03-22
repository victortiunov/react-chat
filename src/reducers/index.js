import { combineReducers } from 'redux';
import auth from './auth';
import chats from './chats';
import services from './services';

export default combineReducers({
	auth, chats, services
});

const getCurrentUserId = (state) => state.auth.user._id;

export const isCreator = (state, chat) => {
	try {
		return chat.creator._id === getCurrentUserId(state);
	} catch (e) {
		return false;
	}
};

export const isMember = (state, chat) => {
	try {
		return chat.members.some(member => (member._id === getCurrentUserId(state)));
	} catch (e) {
		return false;
	}
};

export const isChatMember = (state, chat) => (isCreator(state, chat) || isMember(state, chat));
