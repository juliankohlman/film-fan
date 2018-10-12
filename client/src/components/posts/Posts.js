import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostForm from './PostForm';
import Loading from '../helpers/Loading';
import { getPosts } from '../../actions/post';

class Posts extends Component {
	componentDidMount = () => {
		// fetch the post as soon as component renders/loads
		this.props.getPosts();
	};

	render() {
		// grab posts and loading from
		return (
			<div className="feed">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<PostForm />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	post: state.post
});

export default connect(
	mapStateToProps,
	{ getPosts }
)(Posts);
