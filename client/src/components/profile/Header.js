import React, { Component } from 'react';
import isEmpty from '../../validation/is-empty';

class Header extends Component {
	render() {
		const { profile } = this.props;
		return (
			<div className="row">
				<div className="col-md-12">
					<div className="card card-body bg-info text-white mb-3">
						<div className="row">
							<div className="col-4 col-md-3 m-auto">
								<img
									className="rounded-circle"
									src={profile.user.avatar}
									alt="Gravatar image"
								/>
							</div>
						</div>
						<div className="text-center">
							<h1 className="display-4 text-center">{`${profile.user.name[0].toUpperCase()}${profile.user.name.slice(
								1
							)}`}</h1>
							<p className="lead text-center">
								Loves the <strong>{profile.genre}</strong> film genre.
							</p>

							<p>
								{isEmpty(profile.website) ? null : (
									<a
										className="text-white p-2"
										href={profile.website}
										target="_blank"
									>
										<i className="fas fa-globe fa-2x" />
									</a>
								)}
								{isEmpty(profile.social && profile.social.twitter) ? null : (
									<a
										className="text-white p-2"
										href={profile.social.twitter}
										target="_blank"
									>
										<i className="fab fa-twitter fa-2x" />
									</a>
								)}
								{isEmpty(profile.social && profile.social.youtube) ? null : (
									<a
										className="text-white p-2"
										href={profile.social.youtube}
										target="_blank"
									>
										<i className="fab fa-youtube fa-2x" />
									</a>
								)}
								{isEmpty(profile.social && profile.social.facebook) ? null : (
									<a
										className="text-white p-2"
										href={profile.social.facebook}
										target="_blank"
									>
										<i className="fab fa-facebook fa-2x" />
									</a>
								)}
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Header;