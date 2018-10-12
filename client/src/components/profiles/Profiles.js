import React, { Component } from 'react';
import Loading from '../helpers/Loading';
import ProfileItem from './ProfileItem';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profile';

export class Profiles extends Component {
	componentDidMount = () => {
		this.props.getProfiles();
	};

	render() {
		const { profiles, loading } = this.props.profile;
		let profileItems;
		if (profiles === null || loading) {
			profileItems = <Loading />;
		} else {
			if (profiles.length > 0) {
				profileItems = profiles.map(profile => (
					<ProfileItem key={profile._id} profile={profile} />
				));
			} else {
				profileItems = <h4>No profiles found...</h4>;
			}
		}

		return (
			<div className="profiles">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h1 className="display-4 text-center">FilmFan Profiles</h1>
							<p className="lead text-center">Connect with other FilmFans.</p>
							{profileItems}
						</div>
					</div>
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
	{ getProfiles }
)(Profiles);
