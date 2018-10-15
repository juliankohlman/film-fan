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

// Delete a post
export const deletePost = id => dispatch => {
	axios
		.delete(`/api/posts/${id}`)
		.then(res => {
			dispatch({
				type: DELETE_POST,
				payload: id
			});
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// Like a post
export const likePost = id => dispatch => {
	axios
		.post(`/api/posts/like/${id}`)
		.then(res => {
			dispatch(getPosts());
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// Unlike a post
export const unlikePost = id => dispatch => {
	axios
		.post(`/api/posts/unlike/${id}`)
		.then(res => {
			dispatch(getPosts());
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// Set loading state for posts
export const postLoading = () => {
	return {
		type: POST_LOADING
	};
};
