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
				name: req.body.email,
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

module.exports = router;
