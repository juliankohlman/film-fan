const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
	let errors = {};
	// Sanitize required profile inputs
	data.handle = !isEmpty(data.handle) ? data.handle : '';
	data.status = !isEmpty(data.status) ? data.status : '';
	data.genres = !isEmpty(data.genres) ? data.genres : '';

	if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
		errors.handle = 'Handle should be between 2 and 40 characters';
	}

	if (Validator.isEmpty(data.handle)) {
		errors.handle = 'Must enter a handle';
	}

	if (Validator.isEmpty(data.status)) {
		errors.status = 'Must enter a status';
	}

	if (Validator.isEmpty(data.genres)) {
		errors.genres = 'Must enter a genres';
	}

	if (!isEmpty(data.website)) {
		if (!Validator.isURL(data.website)) {
			errors.website = 'URL is not valid.';
		}
	}

	if (!isEmpty(data.youtube)) {
		if (!Validator.isURL(data.youtube)) {
			errors.youtube = 'URL is not valid.';
		}
	}
	if (!isEmpty(data.twitter)) {
		if (!Validator.isURL(data.twitter)) {
			errors.twitter = 'URL is not valid.';
		}
	}
	if (!isEmpty(data.facebook)) {
		if (!Validator.isURL(data.facebook)) {
			errors.facebook = 'URL is not valid.';
		}
	}
	if (!isEmpty(data.instagram)) {
		if (!Validator.isURL(data.instagram)) {
			errors.instagram = 'URL is not valid.';
		}
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
