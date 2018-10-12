import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import TextFieldGroup from '../helpers/TextFieldGroup';

class PostForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			text: '',
			errors: {}
		};
	}

	onSubmit = e => {
		e.preventDefault();

		const { user } = this.props.auth;

		const newPost = {
			text: this.state.text,
			name: user.name,
			avatar: user.avatar
		};

		this.pr;
		console.log('submit');
	};

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		const { errors } = this.state;
		return (
			<div className="post-form mb-3">
				<div className="card card-info">
					<div className="card-header bg-info text-white">Say Somthing...</div>
					<div className="card-body">
						<form onSubmit={this.onSubmit}>
							<div className="form-group">
								<TextFieldGroup
									placeholder="Create a new post"
									name="text"
									value={this.state.text}
									onChange={this.onChange}
									error={errors.text}
								/>
							</div>
							<button type="submit" className="btn btn-dark">
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ addPost }
)(PostForm);
