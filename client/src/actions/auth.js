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
			dispatch(setCurrentUser(userCredentials));
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const setCurrentUser = userCredentials => {
	return {
		type: SET_CURRENT_USER,
		payload: userCredentials
	};
};
