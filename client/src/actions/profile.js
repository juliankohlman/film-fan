import axios from 'axios';

import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS } from './types';

// Profile loading
export const profileLoadingStatus = () => {
	return {
		type: PROFILE_LOADING
	};
};

// Get current profile
export const getProfile = () => dispatch => {
	dispatch(profileLoadingStatus());
	axios
		.get('/api/profile')
		.then(res =>
			dispatch({
				type: GET_PROFILE,
				payload: res.data
			})
		)
		.catch(err => dispatch({ type: GET_PROFILE, payload: {} }));
};
