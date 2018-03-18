import * as types from '../constants';

const token = localStorage.getItem('token');

const initialState = {
	isAuthenticated: !!token,
	user: null,
	token,
	error: ''
};

export default function auth(state = initialState, action) {
	switch (action.type) {
		case types.SIGNUP_SUCCESS:
		case types.LOGIN_SUCCESS:
			return {
				...state,
				isAuthenticated: true,
				user: action.payload.user,
				token: action.payload.token
			};
		case types.RECIEVE_AUTH_SUCCESS:
			return {
				...state,
				isAuthenticated: true,
				user: action.payload.user
			}
		case types.SIGNUP_FAILURE:
		case types.LOGIN_FAILURE:
		case types.RECIEVE_AUTH_FAILURE:
		case types.LOGOUT_SUCCESS:
			return {
				...state,
				isAuthenticated: false,
				user: null,
				token: '',
				error: action.payload ? action.payload.message : ''
			};
		case types.EDIT_USER_SUCCESS:
			return {
				...state,
				user: action.payload.user
			};

		default:
			return state;
	}
}
