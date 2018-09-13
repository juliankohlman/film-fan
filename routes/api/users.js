const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
// Load in User Model
const User = require('../../models/User');

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
	User.findOne({ email: req.body.email }).then(user => {
		if (user) {
			return res.status(400).json({ email: 'Email already exists' });
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
	const email = req.body.email;
	const pswd = req.body.password;

	User.findOne({ email }).then(user => {
		if (!user) return res.status(404).json({ email: 'User not found' });
		bcrypt.compare(pswd, user.password).then(matching => {
			if (matching) {
				// generate token
				res.json({ msg: 'Sucess' });
			} else {
				return res.status(400).json({ password: 'Password incorrect' });
			}
		});
	});
});

module.exports = router;
