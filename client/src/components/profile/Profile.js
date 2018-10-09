import React, { Component } from 'react';
import Header from './Header';
import About from './About';
import Reviews from './Reviews';
import Favorites from './Favorites';
import Loading from '../helpers/Loading';
import { connect } from 'react-redux';
import getProfileByHandle from '../../actions/profile';

class Profile extends Component {
	componentDidMount = () => {
		this.getProfileByHandle();
	};

	render() {
		<div>
			<Header />
			<About />
			<Reviews />
			<Favorites />
		</div>;
	}
}

const mapStateToProps = state => ({
	profile: state.profile
});

export default connect(mapStateToProps)(Profile);
