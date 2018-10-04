const express = require('express');
const router = express.Router();
// ? Does bringing in mongoose models below negate this require statement?
const mongoose = require('mongoose');
const passport = require('passport');

// Load profile validation
const validateProfileInput = require('../../validation/profile');

// Load review validation
const validateReviewInput = require('../../validation/review');

// Load Profile/User Models
const Profile = require('../../models/Profile');
const User = require('../../models/User');

/**
  @route   GET api/profile/test
  @desc    Tests profile route
  @access  Public
*/

router.get('/test', (req, res) => {
	res.json({ msg: 'Profile route working' });
});

/**
  @route   GET api/profile
  @desc    Get current users profile
  @access  Private
*/

router.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const errors = {};

		Profile.findOne({ user: req.user.id })
			.populate('user', ['name', 'avatar'])
			.then(profile => {
				if (!profile) {
					errors.noprofile = 'Profile for user does not exist.';
					return res.status(404).json(errors);
				}
				res.json(profile);
			})
			.catch(err => res.status(404).json(err));
	}
);

/**
  @route   GET api/profile/all
  @desc    Access all user Profiles
  @access  Public //able to view profiles whether you're logged in or not
*/

router.get('/all', (req, res) => {
	const errors = {};
	Profile.find()
		.populate('user', ['name', 'avatar'])
		.then(profiles => {
			if (!profiles) {
				errors.noprofile = 'No profiles exist.';
				res.status(404).json(errors);
			}
			res.json(profiles);
		})
		.catch(err => res.status(404).json({ profile: 'No profiles found.' }));
});

/**
  @route   GET api/profile/handle/:handle
  @desc    Access a profile by handle (back-end)
  @access  Public //able to view profiles whether you're logged in or not
*/

router.get('/handle/:handle', (req, res) => {
	const errors = {};
	Profile.findOne({ handle: req.params.handle })
		.populate('user', ['name', 'avatar'])
		.then(profile => {
			if (!profile) {
				errors.noprofile = 'Cannot find a Profile for the given user handle.';
				res.status(404).json(errors);
			}
			res.json(profile);
		})
		.catch(err => res.status(404).json(err));
});

/**
  @route   GET api/profile/user/:user_:id
  @desc    Access a profile by id (back-end)
  @access  Public: visitors can view profiles w/out being logged in or registered.
*/

router.get('/user/:user_id', (req, res) => {
	const errors = {};
	Profile.findOne({ user: req.params.user_id })
		.populate('user', ['name', 'avatar'])
		.then(profile => {
			if (!profile) {
				errors.noprofile = 'Cannot find a Profile for the given user id.';
				res.status(404).json(errors);
			}
			res.json(profile);
		})
		.catch(err =>
			res.status(404).json({ profile: 'No profile found for this user.' })
		);
});

/**
  @route   POST api/profile
  @desc    Create/edit user profile
  @access  Private
*/

router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { errors, isValid } = validateProfileInput(req.body);

		// Check Profile input validation
		if (!isValid) {
			// return errors w/ 400 status
			return res.status(400).json(errors);
		}

		// Profile fields
		const profileFields = {};
		profileFields.user = req.user.id;
		// Field assignment from req.body information
		if (req.body.handle) profileFields.handle = req.body.handle;
		if (req.body.company) profileFields.company = req.body.company;
		if (req.body.website) profileFields.website = req.body.website;
		if (req.body.genre) profileFields.genre = req.body.genre;
		if (req.body.bio) profileFields.bio = req.body.bio;
		if (req.body.lboxdusername)
			profileFields.lboxdusername = req.body.lboxdusername;
		// Skills
		if (typeof req.body.skills !== 'undefined') {
			profileFields.skills = req.body.skills.split(',');
		}
		// Social accounts
		profileFields.social = {};
		if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
		if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
		if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
		if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

		Profile.findOne({ user: req.user.id }).then(profile => {
			if (profile) {
				// Make update to user profile and respond w/profile
				Profile.findOneAndUpdate(
					{ user: req.user.id },
					{ $set: profileFields },
					{ new: true }
				).then(profile => res.json(profile));
			} else {
				// create new profile
				// check for handle conflicts (handles must be unique)
				Profile.findOne({ handle: profileFields.handle }).then(profile => {
					if (profile) {
						errors.handle = 'Sorry that handle is already in use.';
						res.status(400).json(errors);
					}
					// Handle is unique so profile can be saved
					new Profile(profileFields).save().then(profile => res.json(profile));
				});
			}
		});
	}
);

/**
  @route   POST api/profile/review
  @desc    Create/edit user film review
  @access  Private
*/

router.post(
	'/review',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { errors, isValid } = validateReviewInput(req.body);

		// Check Review input validation
		if (!isValid) {
			// return errors w/ 400 status
			return res.status(400).json(errors);
		}
		Profile.findOne({ user: req.user.id }).then(profile => {
			const newReview = {
				movie: req.body.movie,
				releaseyear: req.body.releaseyear,
				rating: req.body.rating,
				review: req.body.review,
				watchedon: req.body.watchedon
			};

			// Add review to reviews array
			profile.reviews.unshift(newReview);

			profile.save().then(profile => res.json(profile));
		});
	}
);

/**
  @route   DELETE api/profile/review/:review_id
  @desc    Delete a user film review
  @access  Private
*/

router.delete(
	'/review/:review_id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Profile.findOne({ user: req.user.id })
			.then(profile => {
				// Find index of review we want to remove
				const removeIndex = profile.reviews
					.map(review => review.id)
					.indexOf(req.params.review_id);
				// Remove the review from the reviews array
				profile.reviews.splice(removeIndex, 1);
				// Save the users profile
				profile.save().then(profile => res.json(profile));
			})
			.catch(err => res.status(404).json(err));
	}
);

/**
  @route   DELETE api/profile
  @desc    Delete user and profile
  @access  Private
*/

router.delete(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Profile.findOneAndRemove({ user: req.user.id }).then(() => {
			User.findOneAndRemove({ _id: req.user.id }).then(() => {
				res.json({ success: true });
			});
		});
	}
);

module.exports = router;
