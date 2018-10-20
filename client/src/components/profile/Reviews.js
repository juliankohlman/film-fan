import React, { Component } from 'react';

class Reviews extends Component {
	render() {
		const { reviews } = this.props;

		const reviewInfo = reviews.map(rev => (
			<li key={rev._id} className="list-group-item">
				<h4>{rev.film}</h4>
				<p>{rev.review}</p>
			</li>
		));
		return (
			<div className="row">
				<div className="col-md-12">
					<h3 className="text-center text-info">Film Reviews</h3>
					{reviewInfo.length > 0 ? (
						<ul className="list-group">{reviewInfo}</ul>
					) : (
						<p className="text-center">No Reviews listed yet.</p>
					)}
				</div>
			</div>
		);
	}
}

export default Reviews;
