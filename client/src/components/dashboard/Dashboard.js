import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProfile } from '../../actions/profile';
import Loading from '../helpers/Loading';

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
			dashboardData = <h1>Your Dashboard information</h1>;
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
