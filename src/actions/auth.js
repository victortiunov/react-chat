import * as types from '../constants';

export function signup(username, password) {
	return (dispatch) => {
		dispatch({
			type: types.SIGNUP_REQUEST
		});

		return fetch('http://localhost:8000/v1/signup', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username,
				password
			})
		})
		.then(response => response.json())
		.then(json => {
			if (json.success) {
				return json;
			}
			throw new Error(json.message);
		})
		.then(json => {
			if (!json.token) {
				throw new Error('Token has not been provided!');
			}
			
			localStorage.setItem('token', json.token);

			dispatch({
				type: types.SIGNUP_SUCCESS,
				payload: json
			})
		})
		.catch(reason => dispatch({
			type: types.SIGNUP_FAILURE,
			payload: reason
		}))
	}
}

export function login(username, password) {
	return (dispatch) => {
		dispatch({
			type: types.LOGIN_REQUEST
		});

		return fetch('http://localhost:8000/v1/login', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username,
				password
			})
		})
		.then(response => response.json())
		.then(json => {
			if (json.success) {
				return json;
			}
			throw new Error(json.message);
		})
		.then(json => {
			if (!json.token) {
				throw new Error('Token has not been provided!');
			}
			
			localStorage.setItem('token', json.token);

			dispatch({
				type: types.LOGIN_SUCCESS,
				payload: json
			})
		})
		.catch(reason => dispatch({
			type: types.LOGIN_FAILURE,
			payload: reason
		}))
	}
}

export function logout() {
	return (dispatch) => {
		dispatch({
			type: types.LOGOUT_REQUEST
		});
	}
}

export function recieveAuth() {
	return (dispatch, getState) => {
		const { token } = getState().auth;

		if (!token) {
			return dispatch({
				type: types.RECIEVE_AUTH_FAILURE,
				payload: 'There is no token!'
			})
		}

		return fetch('http://localhost:8000/v1/users/me', {
			headers: {
				'Authorization': `Bearer ${token}`,
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
		})
		.then(response => response.json())
		.then(json => {
			if (json.success) {
				return json;
			}
			throw new Error(json.message);
		})
		.then(json => dispatch({
				type: types.RECIEVE_AUTH_SUCCESS,
				payload: json
			})
		)
		.catch(reason => dispatch({
			type: types.RECIEVE_AUTH_FAILURE,
			payload: reason
		}))
	}
}
