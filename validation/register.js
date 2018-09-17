const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
	let errors = {};

	// Sanitize name for being empty with is-empty validation function
	data.name = !isEmpty(data.name) ? data.name : '';
	data.email = !isEmpty(data.email) ? data.email : '';
	data.password = !isEmpty(data.password) ? data.password : '';
	data.password2 = !isEmpty(data.password2) ? data.password2 : '';

	// Name checks
	if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
		errors.name = 'Name must be between 2 and 30 characters long.';
	}

	if (Validator.isEmpty(data.name)) {
		errors.name = 'Name field is required.';
	}

	// Email checks
	if (Validator.isEmpty(data.email)) {
		errors.email = 'Email field is required.';
	}

	if (!Validator.isEmail(data.email)) {
		errors.email = 'Email is not valid.';
	}

	// Password checks
	if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
		errors.password = 'Password must be at least 6 characters long.';
	}

	if (Validator.isEmpty(data.password)) {
		errors.password = 'Password field is required.';
	}

	if (Validator.isEmpty(data.password2)) {
		errors.password2 = 'Please confirm password.';
	}

	if (!Validator.equals(data.password, data.password2)) {
		errors.password2 = 'Password entry must match.';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
