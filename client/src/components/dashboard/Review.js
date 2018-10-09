import React, { Component } from 'react';
// import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import { deleteReview } from '../../actions/profile';

class Review extends Component {
	onDeleteClick(id) {
		this.props.deleteReview(id);
	}

	render() {
		const reviews = this.props.reviews.map(rev => (
			<li key={rev._id} style={{ listStyle: 'none' }}>
				<h3>{rev.film}</h3>
				<p>{rev.review}</p>
				<button
					onClick={this.onDeleteClick.bind(this, rev._id)}
					className="btn btn-danger"
				>
					Delete Review
				</button>
				<hr />
			</li>
		));
		return (
			<div>
				<h4 className="mb-4">Film Reviews</h4>
				<hr />
				{reviews}
			</div>
		);
	}
}

export default connect(
	null,
	{ deleteReview }
)(Review);
