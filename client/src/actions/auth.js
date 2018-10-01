import axios from 'axios';
import setAuthToken from '../Utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER } from './types';

export const registerUser = (userData, history) => dispatch => {
	axios
		.post('/api/users/register', userData)
		.then(res => history.push('/login'))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const loginUser = userData => dispatch => {
	axios
		.post('/api/users/login', userData)
		.then(res => {
			// Save jwt to localstorage
			const { token } = res.data;
			// assign token to localstorage ONLY STRINGS
			localStorage.setItem('jwt', token);
			// attach token to auth header
			setAuthToken(token);
			// access user data from token
			const userCredentials = jwt_decode(token);
			// send setCurrentUser action to store and update App's state
			dispatch(setCurrentUser(userCredentials));
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// Logged in user set
export const setCurrentUser = userCredentials => {
	return {
		type: SET_CURRENT_USER,
		payload: userCredentials
	};
};

// Log out a user
export const logoutUser = () => dispatch => {
	// destroy token from localstorage
	localStorage.removeItem('jwt');
	// remove auth header from any request that follow
	setAuthToken(false);
	// Clear the current user and make isAuthenticated === false
	dispatch(setCurrentUser({}));
};
