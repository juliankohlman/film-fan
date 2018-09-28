const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
	let errors = {};
	// Sanitize email and password on login attempts
	data.email = !isEmpty(data.email) ? data.email : '';
	data.password = !isEmpty(data.password) ? data.password : '';

	// Email check
	if (!Validator.isEmail(data.email)) {
		errors.email = 'User not found.';
	}

	if (Validator.isEmpty(data.email)) {
		errors.email = 'Email field is required.';
	}

	// Password check
	if (Validator.isEmpty(data.password)) {
		errors.password = 'Password field is required.';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
