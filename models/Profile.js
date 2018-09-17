const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	handle: {
		type: String,
		required: true,
		max: 40
	},
	job: {
		type: String
	},
	website: {
		type: String
	},
	location: {
		type: String
	},
	status: {
		//film student, reviewer, fan, etc...
		type: String,
		required: true
	},
	genres: {
		//favorite genres
		type: [String],
		required: true
	},
	bio: {
		type: String
	},
	lboxdusername: {
		// could also use TMDb user name
		type: String
	},
	social: {
		youtube: { String },
		twitter: { String },
		facebook: { String },
		instagram: { String }
	},
	reviews: [
		{
			movie: {
				type: String,
				required: true
			},
			releaseyear: {
				// should be generated from TMDb
				type: Number,
				required: true
			},
			rating: {
				type: Number,
				min: 0,
				max: 5,
				required: true
			},
			comments: [
				{
					user: {
						type: Schema.Types.ObjectId,
						ref: 'users'
					},
					body: {
						type: String,
						required: true
					},
					name: {
						type: String
					},
					avatar: {
						type: String
					},
					date: {
						type: Date,
						default: Date.now
					}
				}
			],
			review: {
				type: String,
				required: true
			},
			watchedon: {
				type: Date,
				required: true
			},
			likes: {
				type: Number
			}
		}
	]
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
