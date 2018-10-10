import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import About from './About';
import Reviews from './Reviews';
import Favorites from './Favorites';
import Loading from '../helpers/Loading';
import { connect } from 'react-redux';
import { getProfileByHandle } from '../../actions/profile';

class Profile extends Component {
	componentDidMount = () => {
		// * TODO store => this.props.match.params.handle; in a variable
		if (this.props.match.params.handle) {
			this.props.getProfileByHandle(this.props.match.params.handle);
		}
	};

	render() {
		const { profile, loading } = this.props.profile;
		let profileContent;

		if (profile === null || loading) {
			profileContent = <Loading />;
		} else {
			profileContent = (
				<div>
					<div className="row">
						<div className="col-md-6">
							<Link to="/profiles" className="btn btn-light mb-3 float-left">
								Back to Profiles
							</Link>
						</div>
						<div className="col-md-6" />
					</div>
					<Header profile={profile} />
					<About />
					<Reviews />
					<Favorites />
				</div>
			);
		}
		return (
			<div className="profile">
				<div className="container">
					<div className="row" />
					<div className="col-md-12">{profileContent}</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	profile: state.profile
});

export default connect(
	mapStateToProps,
	{ getProfileByHandle }
)(Profile);
