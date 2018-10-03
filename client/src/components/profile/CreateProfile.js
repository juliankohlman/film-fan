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
			status: '',
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
