import axios from 'axios';

import {
	GET_ERRORS,
	POST_LOADING,
	GET_POSTS,
	GET_POST,
	ADD_POST,
	DELETE_POST
} from './types';

// Add a post
export const addPost = postData => dispatch => {
	axios
		.post('/api/posts', postData)
		.then(res => {
			dispatch({
				type: ADD_POST,
				payload: res.data
			});
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// getPost
export const getPosts = () => dispatch => {
	dispatch(postLoading());
	axios
		.get('/api/posts')
		.then(res => {
			dispatch({
				type: GET_POSTS,
				payload: res.data
			});
		})
		.catch(err =>
			dispatch({
				type: GET_POSTS,
				payload: null
			})
		);
};

// Set loading state for posts
export const postLoading = () => {
	return {
		type: POST_LOADING
	};
};
