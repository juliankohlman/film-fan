import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deletePost, likePost, unlikePost } from '../../actions/post';

class PostItem extends Component {
	handleDelete = id => {
		this.props.deletePost(id);
	};

	handleLike = id => {
		this.props.likePost(id);
	};

	handleUnlike = id => {
		this.props.unlikePost(id);
	};

	findUserLike = likes => {
		const { auth } = this.props;
		const userLikedPost = likes.some(like => like.user === auth.user.id);
		return userLikedPost;
	};

	render() {
		const { post, auth } = this.props;

		return (
			<div className="card card-body mb-3">
				<div className="row">
					<div className="col-md-2">
						<a href="profile.html">
							<img
								className="rounded-circle d-none d-md-block"
								src={post.avatar}
								alt=""
							/>
						</a>
						<br />
						<p className="text-center">{post.name}</p>
					</div>
					<div className="col-md-10">
						<p className="lead">{post.text}</p>
						<button
							onClick={() => this.handleLike(post._id)}
							type="button"
							className="btn btn-light mr-1"
						>
							{/* <i className="text-info fas fa-thumbs-up" /> */}
							<i
								className={classnames('fas fa-thumbs-up', {
									'text-info': this.findUserLike(post.likes)
								})}
							/>
							<span className="badge badge-light">{post.likes.length}</span>
						</button>
						<button
							onClick={() => this.handleUnlike(post._id)}
							type="button"
							className="btn btn-light mr-1"
						>
							<i className="text-secondary fas fa-thumbs-down" />
						</button>
						<Link
							to={`/post/${post._id}`}
							// href="post.html"
							className="btn btn-info mr-1"
						>
							Comments
						</Link>
						{post.user === auth.user.id ? (
							<button
								onClick={() => this.handleDelete(post._id)}
								type="button"
								className="btn btn-danger mr-1"
							>
								<i className="fas fa-times" />
							</button>
						) : null}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ deletePost, unlikePost, likePost }
)(PostItem);
