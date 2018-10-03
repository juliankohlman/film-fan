import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextFieldGroup from '../helpers/TextFieldGroup';
import TextAreaGroup from '../helpers/TextAreaGroup';
import SelectGroup from '../helpers/SelectGroup';
import InputGroup from '../helpers/InputGroup';

class CreateProfile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			displaySocialInputs: false,
			handle: '',
			company: '',
			website: '',
			genre: '',
			bio: '',
			twitter: '',
			facebook: '',
			linkedin: '',
			youtube: '',
			instagram: '',
			errors: {}
		};
	}

	onChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	onSubmit = e => {
		e.preventDefault();
		console.log('submit');
	};

	render() {
		const { errors } = this.state;

		// Status options for selector
		const options = [
			{ label: '* Favorite Film Genre', value: 0 },
			{ label: 'Action & Adventure', value: 'Action & Adventure' },
			{ label: 'Comedy', value: 'Comedy' },
			{ label: 'Crime', value: 'Crime' },
			{ label: 'Documentary', value: 'Documentary' },
			{ label: 'Drama', value: 'Drama' },
			{ label: 'Fantasy', value: 'Fantasy' },
			{ label: 'History', value: 'History' },
			{ label: 'Horror', value: 'Horror' },
			{ label: 'Kids & Family', value: 'Kids & Family' },
			{ label: 'Music & Musical', value: 'Music & Musical' },
			{ label: 'Mystery & Thriller', value: 'Mystery & Thriller' },
			{ label: 'Romance', value: 'Romance' },
			{ label: 'Science-Fiction', value: 'Science-Fiction' },
			{ label: 'War & Military', value: 'War & Military' },
			{ label: 'Western', value: 'Western' },
			{ label: 'Sports', value: 'Sports' },
			{ label: 'Cult classics', value: 'Cult classics' },
			{ label: 'B-Movies', value: 'B-Movies' },
			{ label: 'Other', value: 'Other' }
		];

		return (
			<div className="create-profile">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Create Profile</h1>
							<p className="lead text-center">
								Add Information to complete your profile
							</p>
							<small className="d-block pb-3">* = required fields</small>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									placeholder="* Profile Handle"
									name="handle"
									value={this.state.handle}
									onChange={this.onChange}
									error={errors.handle}
									info="A unique handle for your profile URL. Add your full name, company name, and nickname"
								/>
								<SelectGroup
									placeholder="Favorite Genre..."
									name="genre"
									value={this.state.genre}
									onChange={this.onChange}
									error={errors.genre}
									options={options}
									info="What's your favorite film genre?"
								/>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	profile: state.profile,
	errors: state.errors
});

export default connect(mapStateToProps)(CreateProfile);
