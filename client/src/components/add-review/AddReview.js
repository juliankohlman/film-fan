import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../helpers/TextFieldGroup';
import TextAreaGroup from '../helpers/TextAreaGroup';
import { connect } from 'react-redux';
// action for adding review

class AddReview extends Component {
	constructor(props) {
		super(props);

		this.state = {
			film: '',
			review: '',
			errors: {}
		};
	}
	render() {
		const { errors } = this.state;
		return (
			<div className="add-experience">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<Link to="/dashboard" className="btn btn-light">
								Back to Dashboard
							</Link>
							<h1 className="display-4 text-center">Add Review</h1>
							<p className="lead text-center">
								Pick a film, any film{' '}
								<span role="img" aria-label="popcorn">
									🍿
								</span>
							</p>
							<small className="d-block pb-3">* = required fields</small>
						</div>
					</div>
				</div>
				{/* title of film being reviewed */}
				<TextFieldGroup
					placeholder="* Film Title"
					name="film"
					value={this.state.film}
					onChange={this.onChange}
					error={errors.film}
					info="Enter the title of the film you reviewed"
				/>
				{/* actual review */}
				<TextAreaGroup
					placeholder="* Film review here..."
					name="review"
					value={this.state.review}
					onChange={this.onChange}
					error={errors.review}
					info="A short review of a film."
				/>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	profile: state.profile,
	errors: state.errors
});

export default connect(mapStateToProps)(withRouter(AddReview));
