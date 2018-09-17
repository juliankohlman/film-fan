const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load in User Model
const User = require('../../models/User');

// Load Input Validations
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Gravatar library
const gravatar = require('gravatar');

/**
  @route   GET api/users/test
  @desc    Tests users route
  @access  Public
*/

router.get('/test', (req, res) => res.json({ msg: 'User route working' }));

/**
  @route   POST api/users/register
  @desc    Register user route
  @access  Public
*/

router.post('/register', (req, res) => {
	// validate name, email, and password...checks for errors too.
	const { errors, isValid } = validateRegisterInput(req.body);

	// if there are errors
	if (!isValid) return res.status(400).json({ errors });

	User.findOne({ email: req.body.email }).then(user => {
		if (user) {
			errors.email = 'Email already in use.';
			return res.status(400).json(errors);
		} else {
			const avatar = gravatar.url(req.body.email, {
				s: '200',
				r: 'pg',
				d: 'mm'
			});

			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				avatar,
				password: req.body.password
			});

			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser
						.save()
						.then(user => {
							res.json(user);
						})
						.catch(err => console.log(err));
				});
			});
		}
	});
});

/**
  @route   POST api/users/login
  @desc    Login User / Generate & return JWT Token
  @access  Public
*/

router.post('/login', (req, res) => {
	const { errors, isValid } = validateLoginInput(req.body);

	// if there are errors
	if (!isValid) return res.status(400).json({ errors });

	const email = req.body.email;
	const pswd = req.body.password;

	User.findOne({ email }).then(user => {
		if (!user) {
			errors.email =
				'User not found, please check your email, and try again.';
			return res.status(404).json(errors);
		}

		// password check/confirmation
		bcrypt.compare(pswd, user.password).then(matching => {
			if (matching) {
				// token payload
				const tokenPayload = {
					id: user.id,
					name: user.name,
					avatar: user.avatar
				};
				// generate token for matching user
				jwt.sign(
					tokenPayload,
					keys.secretOrKey,
					{ expiresIn: 18000000 }, // 5hrs
					(err, token) => {
						res.json({
							success: true,
							token: 'Bearer ' + token
						});
					}
				);
			} else {
				return res.status(400).json({ password: 'Password incorrect' });
			}
		});
	});
});

/**
  @route   GET api/users/current
  @desc    Return current user route
  @access  Private
*/
router.get(
	'/current',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		res.json({
			name: req.user.name,
			email: req.user.email,
			id: req.user.id
		});
	}
);

module.exports = router;
