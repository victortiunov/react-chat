import * as types from '../constants/users';
import * as routes from '../constants/routes';
import callApi from '../utils/call-api';

export function editUser(username, firstName, lastName) {
	return (dispatch, getState) => {
		const { token } = getState().auth;

		dispatch({
			type: types.EDIT_USER_REQUEST
		});

		return callApi(
			routes.USERS_ME,
			token,
			{ method: 'POST' },
			{ data: { username, firstName, lastName } }
		)
			.then((json) => {
				dispatch({
					type: types.EDIT_USER_SUCCESS,
					payload: json
				});
			})
			.catch((reason) => {
				dispatch({
					type: types.EDIT_USER_FAILURE,
					payload: reason
				});
			});
	}
}
