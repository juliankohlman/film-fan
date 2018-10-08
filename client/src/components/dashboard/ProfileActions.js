import React from 'react';
import { Link } from 'react-router-dom';
const ProfileActions = () => {
	return (
		<div className="btn-group mb-4" role="group">
			<Link to="edit-profile" className="btn btn-light">
				<i className="fas fa-user-circle text-info mr-1" /> Edit Profile
			</Link>
			<Link to="add-review" className="btn btn-light">
				<i className="fas fa-pen-square text-info mr-1" />
				Add Film Review
			</Link>
			<Link to="add-favorite" className="btn btn-light">
				<i className="fas fa-film text-info mr-1" />
				Add Favorite Films
			</Link>
		</div>
	);
};

export default ProfileActions;
