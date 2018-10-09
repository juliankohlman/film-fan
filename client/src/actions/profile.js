import axios from 'axios';

import {
	GET_PROFILE,
	GET_ERRORS,
	PROFILE_LOADING,
	CLEAR_CURRENT_PROFILE,
	SET_CURRENT_USER
} from './types';

// Profile loading
export const profileLoadingStatus = () => {
	return {
		type: PROFILE_LOADING
	};
};

// Clear profile
export const clearProfile = () => {
	return {
		type: CLEAR_CURRENT_PROFILE
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

// Create profile
// * using history to redirect user
export const createProfile = (profileData, history) => dispatch => {
	axios
		.post('/api/profile', profileData)
		.then(res => history.push('/dashboard'))
		.catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Add review
export const addReview = (reviewData, history) => dispatch => {
	axios
		.post('/api/profile/review', reviewData)
		.then(res => history.push('/dashboard'))
		.catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Delete user account/profile
export const deleteAccount = () => dispatch => {
	if (window.confirm('Delete Account?')) {
		axios
			.delete('/api/profile')
			.then(res =>
				dispatch({
					type: SET_CURRENT_USER,
					payload: {}
				})
			)
			.catch(err =>
				dispatch({
					type: GET_ERRORS,
					payload: err.response.date
				})
			);
	}
};
