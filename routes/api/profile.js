const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load profile validation
const validateProfileInput = require('../../validation/profile');

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
				errors.noprofile =
					'Cannot find a Profile for the given user handle.';
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
				errors.noprofile =
					'Cannot find a Profile for the given user id.';
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
		if (req.body.job) profileFields.job = req.body.job;
		if (req.body.website) profileFields.website = req.body.website;
		if (req.body.location) profileFields.location = req.body.location;
		if (req.body.status) profileFields.status = req.body.status;
		if (req.body.bio) profileFields.bio = req.body.bio;
		if (req.body.lboxdusername)
			profileFields.lboxdusername = req.body.lboxdusername;
		// Favorite Genres as an array
		if (typeof req.body.genres !== 'undefined') {
			profileFields.genres = req.body.genres.split(',');
		}
		// Social accounts
		profileFields.social = {};
		if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
		if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
		if (req.body.facebook)
			profileFields.social.facebook = req.body.facebook;
		if (req.body.instagram)
			profileFields.social.instagram = req.body.instagram;

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
				Profile.findOne({ handle: profileFields.handle }).then(
					profile => {
						if (profile) {
							errors.handle =
								'Sorry that handle is already in use.';
							res.status(400).json(errors);
						}
						// Handle is unique so profile can be saved
						new Profile(profileFields)
							.save()
							.then(profile => res.json(profile));
					}
				);
			}
		});
	}
);

module.exports = router;
