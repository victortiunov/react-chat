import * as types from '../constants/chats';
import * as routes from '../constants/routes';
import callApi from '../utils/call-api';
import { redirect } from './services';

export function fetchAllChats() {
	return (dispatch, getState) => {
		const state = getState();
		const { token } = state.auth;
		const { isFetching } = state.services;

		if (isFetching.allChats) {
			return Promise.resolve();
		}

		dispatch({
			type: types.FETCH_ALL_CHATS_REQUEST
		});

		return callApi(
			routes.CHATS,
			token
		)
			.then(json => dispatch({
				type: types.FETCH_ALL_CHATS_SUCCESS,
				payload: json
			}))
			.catch(reason => dispatch({
				type: types.FETCH_ALL_CHATS_FAILURE,
				payload: reason
			}))
	};
}

export function fetchMyChats() {
	return (dispatch, getState) => {
		const state = getState();
		const { token } = state.auth;
		const { isFetching } = state.services;

		if (isFetching.myChats) {
			return Promise.resolve();
		}

		dispatch({
			type: types.FETCH_MY_CHATS_REQUEST
		});

		return callApi(
			routes.MY_CHATS,
			token
		)
			.then(json => dispatch({
				type: types.FETCH_MY_CHATS_SUCCESS,
				payload: json
			}))
			.catch(reason => dispatch({
				type: types.FETCH_MY_CHATS_FAILURE,
				payload: reason
			}))
	};
}

export function fetchChat(chatId) {
	return (dispatch, getState) => {
		const state = getState();
		const { token } = state.auth;
		const { isFetching } = state.services;

		if (isFetching.chat) {
			return Promise.resolve();
		}

		dispatch({
			type: types.FETCH_CHAT_REQUEST
		});

		return callApi(
			`${routes.CHATS}/${chatId}`,
			token
		)
			.then(json => {
				dispatch({
					type: types.FETCH_CHAT_SUCCESS,
					payload: json
				});

				return json;
			})
			.catch(reason => dispatch({
				type: types.FETCH_CHAT_FAILURE,
				payload: reason
			}))
	};
}

export function setActiveChat(chatId) {
	return (dispatch) => {
		return dispatch(fetchChat(chatId))
			.then(json => {
				if (!json) {
					dispatch(redirect('/chat'));

					return dispatch({
						type: types.UNSET_ACTIVE_CHAT
					});
				}

				dispatch({
					type: types.SET_ACTIVE_CHAT,
					payload: json
				})
			})
	};
}

export function createChat(chatTitle) {
	return (dispatch, getState) => {
		const state = getState();
		const { token } = state.auth;
		const { isFetching } = state.services;

		if (isFetching.createChat) {
			return Promise.resolve();
		}

		dispatch({
			type: types.CREATE_CHAT_REQUEST,
			payload: { chatTitle },
		});

		return callApi(
			routes.CHATS,
			token,
			{ method: 'POST' },
			{
				data: { title: chatTitle }
			}
		)
			.then(({ chat }) => {
				dispatch({
					type: types.CREATE_CHAT_SUCCESS,
					payload: { chat },
				});

				return chat;
			})
			.catch(reason =>
				dispatch({
					type: types.CREATE_CHAT_FAILURE,
					payload: reason,
				}));
	};
}

export function leaveChat(chatId) {
	return (dispatch, getState) => {
		const state = getState();
		const { token } = state.auth;
		const { isFetching } = state.services;

		if (isFetching.leaveChat) {
			return Promise.resolve();
		}

		dispatch({
			type: types.LEAVE_CHAT_REQUEST,
			payload: { chatId }
		});

		return callApi(
			`/chats/${chatId}/leave`
			, token
		)
			.then((json) => {
				dispatch({
					type: types.LEAVE_CHAT_SUCCESS,
					payload: json
				});

				dispatch({
					type: types.UNSET_ACTIVE_CHAT
				});
			})
			.catch((reason) => {
				dispatch({
					type: types.LEAVE_CHAT_FAILURE,
					payload: reason
				});
			});
	};
}

export function deleteChat(chatId) {
	return (dispatch, getState) => {
		const state = getState();
		const { token } = state.auth;
		const { isFetching } = state.services;

		if (isFetching.deleteChat) {
			return Promise.resolve();
		}

		dispatch({
			type: types.DELETE_CHAT_REQUEST,
			payload: { chatId }
		});

		return callApi(
			`${routes.CHATS}/${chatId}`,
			token,
			{ method: 'DELETE' }
		)
			.then((json) => {
				dispatch({
					type: types.DELETE_CHAT_SUCCESS,
					payload: json
				});

				dispatch({
					type: types.UNSET_ACTIVE_CHAT
				});
			})
			.catch((reason) => {
				dispatch({
					type: types.DELETE_CHAT_FAILURE,
					payload: reason
				});
			});
	};
}

export function joinChat(chatId) {
	return (dispatch, getState) => {
		const state = getState();
		const { token } = state.auth;
		const { isFetching } = state.services;

		if (isFetching.joinChat) {
			return Promise.resolve();
		}

		dispatch({
			type: types.JOIN_CHAT_REQUEST,
			payload: { chatId }
		});

		return callApi(
			`/chats/${chatId}/join`,
			token
		)
			.then((json) => {
				dispatch({
					type: types.JOIN_CHAT_SUCCESS,
					payload: json
				});

				dispatch(setActiveChat(chatId));
			})
			.catch((reason) => {
				dispatch({
					type: types.JOIN_CHAT_FAILURE,
					payload: reason
				});
			});
	};
}
