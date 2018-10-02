import React, { Component } from 'react';
import Loading from '../helpers/Loading';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProfile } from '../../actions/profile';

class Dashboard extends Component {
	// immediately get the profile
	componentDidMount = () => {
		this.props.getProfile();
	};

	render() {
		const { user } = this.props.auth;
		const { profile, loading } = this.props.profile;

		let dashboardData;

		if (profile === null || loading) {
			dashboardData = <Loading />;
		} else {
			// does user have a profile?
			if (!!Object.entries(profile).length) {
				dashboardData = <h4>DISPLAY PROFILE DATA</h4>;
			} else {
				dashboardData = (
					<div>
						<p className="lead text-muted">Welcome {user.name}</p>{' '}
						<p>Let's get started on your profile with some info!</p>
						<Link to="/create-profile" className="btn btn-lg btn-info">
							Create Profile
						</Link>
					</div>
				);
			}
		}

		return (
			<div className="dashboard">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h1 className="display-4">Dashboard</h1>
							{dashboardData}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	profile: state.profile,
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ getProfile }
)(Dashboard);
