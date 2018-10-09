import React, { Component } from 'react';
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
		return (
			<div>
				<Header />
				<About />
				<Reviews />
				<Favorites />
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
