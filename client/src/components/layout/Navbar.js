import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/auth';
import { clearProfile } from '../../actions/profile';

class Navbar extends Component {
	handleLogout(e) {
		e.preventDefault();
		this.props.clearProfile();
		this.props.logoutUser();
	}

	render() {
		const { isAuthenticated, user } = this.props.auth;
		const authLinks = (
			<ul className="navbar-nav ml-auto">
				<li className="nav-item">
					<a
						href=""
						onClick={this.handleLogout.bind(this)}
						className="nav-link"
						alt="Logout Button"
					>
						<img
							className="rounded-circle"
							src={user.avatar}
							alt={user.name}
							title="Connect a gravatar to your email to display"
							style={{
								width: '25px',
								marginRight: '7px'
							}}
						/>
						Logout
					</a>
				</li>
			</ul>
		);

		const guestLinks = (
			<ul className="navbar-nav ml-auto">
				<li className="nav-item">
					<Link className="nav-link" to="/register">
						Sign Up
					</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/login">
						Login
					</Link>
				</li>
			</ul>
		);

		return (
			<nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
				<div className="container">
					<Link className="navbar-brand" to="/">
						FilmFan
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#mobile-nav"
					>
						<span className="navbar-toggler-icon" />
					</button>

					<div className="collapse navbar-collapse" id="mobile-nav">
						<ul className="navbar-nav mr-auto">
							<li className="nav-item">
								<Link className="nav-link" to="/profiles">
									{' '}
									Members
								</Link>
							</li>
						</ul>
						{isAuthenticated ? authLinks : guestLinks}
					</div>
				</div>
			</nav>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ logoutUser, clearProfile }
)(Navbar);
