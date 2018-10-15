import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from '../helpers/Loading';
import { getPost } from '../../actions/post';
import { Link } from 'react-router-dom';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';

class Post extends Component {
	componentDidMount = () => {
		this.props.getPost(this.props.match.params.id);
	};

	render() {
		const { post, loading } = this.props.post;
		let postInfo;

		if (post === null || loading || Object.keys(post).length === 0) {
			postInfo = <Loading />;
		} else {
			postInfo = (
				<div>
					<PostItem post={post} showActions={false} />
					<CommentForm postId={post._id} />
				</div>
			);
		}

		return (
			<div className="post">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<Link to="/feed" className="btn btn-light mb-3">
								Back to feed
							</Link>
							{postInfo}
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
	{ getPost }
)(Post);
