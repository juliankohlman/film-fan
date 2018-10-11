import React, { Component } from 'react';
import isEmpty from '../../validation/is-empty';

class Reviews extends Component {
	render() {
		const { reviews } = this.props;

		return (
			<div>
				<h1>Reviews</h1>
			</div>
		);
	}
}

export default Reviews;
