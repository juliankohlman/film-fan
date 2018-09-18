const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Bring in Post model, and Profile model
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

// Post validation
const validatePostInput = require('../../validation/post');

/**
  @route   GET api/posts/test
  @desc    Tests posts route
  @access  Public
*/

router.get('/test', (req, res) => {
	res.json({ msg: 'Post route working' });
});

/**
  @route   GET api/posts
  @desc    Get posts
  @access  Public
*/

router.get('/', (req, res) => {
	Post.find()
		.sort({ date: -1 }) // descending
		.then(posts => res.json(posts))
		.catch(err =>
			res
				.status(404)
				.json({ nopostfound: 'No posts found with given ID.' })
		);
});

/**
  @route   GET api/posts/:id
  @desc    Get posts by it's ID
  @access  Public
*/

router.get('/:id', (req, res) => {
	Post.findById(req.params.id)
		.then(post => res.json(post))
		.catch(err =>
			res
				.status(404)
				.json({ nopostfound: 'No post found with given ID.' })
		);
});

/**
  @route   POST api/posts
  @desc    Create a post
  @access  Private
*/

router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { errors, isValid } = validatePostInput(req.body);

		// Post validation check
		if (!isValid) {
			// no errors send 400 w/error object
			return res.status(400).json(errors);
		}
		const newPost = new Post({
			text: req.body.text,
			name: req.body.name,
			avatar: req.body.avatar,
			user: req.user.id
		});

		newPost.save().then(post => res.json(post));
	}
);

/**
  @route   DELETE api/posts/:id
  @desc    Delete a post
  @access  Private
*/

router.delete(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		// Check for valid Owner of Profile
		Profile.findOne({ user: req.user.id }).then(profile => {
			Post.findById(req.params.id)
				.then(post => {
					// Verify that post belongs to user (post_id, user_id)
					if (post.user.toString() !== req.user.id) {
						return res
							.status(401)
							.json({ notauthorized: 'User not authorized.' });
					}
					// Delete the post
					post.remove().then(() => res.json({ success: true }));
				})
				.catch(err =>
					res.status(404).json({ postnotfound: 'No post found.' })
				);
		});
	}
);

/**
  @route   Post api/posts/like/:id
  @desc    Add a like to a post
  @access  Private
*/

router.post(
	'/like/:id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		// Check for valid Owner of Profile
		Profile.findOne({ user: req.user.id }).then(profile => {
			Post.findById(req.params.id)
				.then(post => {
					let likesLength =
						post.likes.filter(
							like => like.user.toString() === req.user.id
						).length > 0;

					if (likesLength) {
						return res.status(400).json({
							previouslyliked: 'User previously liked this post'
						});
					}
					post.likes.unshift({ user: req.user.id });
					post.save().then(post => res.json(post));
				})
				.catch(err =>
					res.status(404).json({ postnotfound: 'No post found.' })
				);
		});
	}
);

/**
  @route   Post api/posts/unlike/:id
  @desc    Add a unlike to a post
  @access  Private
*/

router.post(
	'/unlike/:id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		// Check for valid Owner of Profile
		Profile.findOne({ user: req.user.id }).then(profile => {
			Post.findById(req.params.id)
				.then(post => {
					let likesLength =
						post.likes.filter(
							like => like.user.toString() === req.user.id
						).length === 0;

					if (likesLength) {
						return res.status(400).json({
							notliked: 'User has not liked this post.'
						});
					}
					// Remove like from likes array
					const removeIndex = post.likes
						.map(item => item.user.toString())
						.indexOf(req.user.id);
					// Remove the like from the likes array
					post.likes.splice(removeIndex, 1);

					post.save().then(post => res.json(post));
				})
				.catch(err =>
					res.status(404).json({ postnotfound: 'No post found.' })
				);
		});
	}
);

/**
  @route   Post api/posts/comment/:id
  @desc    Add comment to a post
  @access  Private
*/

router.post(
	'/comment/:id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		// Check for valid Owner of Profile
		const { errors, isValid } = validatePostInput(req.body);
		// Post validation check
		if (!isValid) {
			// no errors send 400 w/error object
			return res.status(400).json(errors);
		}

		Post.findById(req.params.id)
			.then(post => {
				const newComment = {
					text: req.body.text,
					name: req.body.name,
					avatar: req.body.avatar,
					user: req.user.id
				};
				// Add new comment to comments array
				post.comments.unshift(newComment);
				// Save the post
				post.save().then(post => res.json(post));
			})
			.catch(err =>
				res.status(404).json({ postnotfound: 'No post found.' })
			);
	}
);

/**
  @route   Post api/posts/comment/:id/:comment_id
  @desc    Delete a comment from post
  @access  Private
*/

router.delete(
	'/comment/:id/:comment_id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Post.findById(req.params.id)
			.then(post => {
				// Does comment exist?
				const postExists =
					post.comments.filter(
						comment =>
							comment._id.toString() === req.params.comment_id
					).length === 0;

				if (postExists) {
					return res
						.status(404)
						.json({ commentnonexistent: 'Comment does not exist' });
				}
				// Find the index to remove
				const removeIndex = post.comments
					.map(comment => comment._id.toString())
					.indexOf(req.params.comment_id);
				// Remove the index (using splice())
				post.comments.splice(removeIndex, 1);
				post.save().then(post => res.json(post));
			})
			.catch(err =>
				res.status(404).json({ postnotfound: 'No post found.' })
			);
	}
);

module.exports = router;
