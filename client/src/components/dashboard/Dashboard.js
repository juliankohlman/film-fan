import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProfile } from '../../actions/profile';

class Dashboard extends Component {
	// immediately get the profile
	componentDidMount = () => {
		this.props.getProfile();
	};

	render() {
		return (
			<div>
				<h1>Dashboard</h1>
			</div>
		);
	}
}

export default connect(
	null,
	{ getProfile }
)(Dashboard);
