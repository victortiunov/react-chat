import SocketIOClient from 'socket.io-client';
import * as types from '../constants/sockets';
import * as routes from '../constants/routes';
import { fetchChat } from './chats';

export function missingSocketConnection() {
	return {
		type: types.SOCKETS_CONNECTION_MISSING,
		payload: new Error('Missing connection')
	}
}

let socket = null;

export function socketsConnect() {
	return (dispatch, getState) => {
		const state = getState();
		const { token } = state.auth;
		const { isFetching } = state.services;

		if (isFetching.sockets) {
			return Promise.resolve();
		}

		dispatch({
			type: types.SOCKETS_CONNECTION_REQUEST
		});

		socket = SocketIOClient(
			routes.SOCKET_ROUTE,
			{ query: { token } }
		);

		socket.on('connect', () => {
			dispatch({
				type: types.SOCKETS_CONNECTION_SUCCESS
			});
		});

		socket.on('error', (error) => {
			dispatch({
				type: types.SOCKETS_CONNECTION_FAILURE,
				payload: new Error(`Connection: ${error}`)
			});
		});

		socket.on('connect_error', () => {
			dispatch({
				type: types.SOCKETS_CONNECTION_FAILURE,
				payload: new Error('We have lost connection!')
			});
		});

		socket.on('new-message', ({ message }) => {
			dispatch({
				type: types.RECIEVE_MESSAGE,
				payload: { message }
			});

			dispatch(fetchChat(message.chatId));
		});
		
		socket.on('new-chat', ({ chat }) => {
			dispatch({
				type: types.RECIEVE_NEW_CHAT,
				payload: { chat }
			});
		});
		
		socket.on('deleted-chat', ({ chat }) => {
			dispatch({
				type: types.RECIEVE_DELETED_CHAT,
				payload: { chat }
			});
		});
	}
}

export function sendMessage(message) {
	return (dispatch, getState) => {
		const { activeId } = getState().chats;

		if (!socket) {
			dispatch(missingSocketConnection());
		}

		socket.emit(
			'send-message',
			{
				chatId: activeId,
				content: message
			},
			() => {
				dispatch({
					type: types.SEND_MESSAGE,
					payload: {
						chatId: activeId,
						content: message
					}
				});
			}
		);
	}
}

export function mountChat(chatId) {
	return (dispatch, getState) => {
		if (!socket) {
			dispatch(missingSocketConnection());
		}

		socket.emit('mount-chat', chatId);

		dispatch({
			type: types.MOUNT_CHAT,
			payload: { chatId }
		});
	}
}

export function unmountChat(chatId) {
	return (dispatch, getState) => {
		if (!socket) {
			dispatch(missingSocketConnection());
		}

		socket.emit('unmount-chat', chatId);

		dispatch({
			type: types.UNMOUNT_CHAT,
			payload: { chatId }
		});
	}
}
