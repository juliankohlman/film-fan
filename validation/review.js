const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateReviewInput(data) {
	let errors = {};
	// Sanitize email and password on login attempts
	data.film = !isEmpty(data.film) ? data.film : '';
	// data.releaseyear = !isEmpty(data.releaseyear) ? data.releaseyear : ''; // int
	// data.rating = !isEmpty(data.rating) ? data.rating : ''; // int
	data.review = !isEmpty(data.review) ? data.review : '';
	// data.watchedon = !isEmpty(data.watchedon) ? data.watchedon : ''; // date

	// Movie check
	if (Validator.isEmpty(data.film)) {
		errors.film = 'Film title is required';
	}
	// if (Validator.isEmpty(data.releaseyear)) {
	// 	errors.releaseyear = 'Film release year is required';
	// }
	// if (Validator.isEmpty(data.rating)) {
	// 	errors.rating = 'Film rating is required';
	// }
	if (Validator.isEmpty(data.review)) {
		errors.review = 'Film review is required';
	}
	// if (Validator.isEmpty(data.watchedon)) {
	// 	errors.watchedon = 'Date film watched is required';
	// }

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
