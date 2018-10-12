import React, { Component } from 'react';
import isEmpty from '../../validation/is-empty';

// * TODO save user names as Title Case in backend so you don't have to manipulate them here
class About extends Component {
	render() {
		const { profile } = this.props;
		const favorites = profile.skills.map((skill, idx) => (
			<div key={idx} className="p-3">
				{/* change fontawesome check to something more movie related */}
				<i className="fa fa-check" /> {skill}
			</div>
		));
		return (
			<div className="row">
				<div className="col-md-12">
					<div className="card card-body bg-light mb-3">
						<h3 className="text-center text-info">
							{`${profile.user.name[0].toUpperCase()}${profile.user.name.slice(
								1
							)}`}
							's Bio
						</h3>
						<p className="lead">
							{/* Add some leading questions to help users fill out there bio and give a sense of why they love films */}
							{isEmpty(profile.bio) ? (
								<span>{profile.user.name} does not have a bio yet.</span>
							) : (
								<span>{profile.bio}</span>
							)}
						</p>
						<hr />
						<h3 className="text-center text-info">Favorite Films</h3>
						<div className="row">
							<div className="d-flex flex-wrap justify-content-center align-items-center">
								{favorites}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default About;
