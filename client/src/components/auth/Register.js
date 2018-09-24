import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/auth';
import axios from 'axios';

class Register extends Component {
	constructor() {
		super();
		this.state = {
			name: '',
			email: '',
			password: '',
			password2: '',
			errors: {}
		};

		// example binding within constructor
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onSubmit(e) {
		e.preventDefault();
		const newUser = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2
		};
		// make axios request to register user from front-end
		// gets replaced w/redux action dispatches

		this.props.registerUser(newUser);
		// axios
		// 	.post('/api/users/register', newUser)
		// 	.then(res => console.log(res.data))
		// 	.catch(err =>
		// 		this.setState({
		// 			errors: err.response.data
		// 		})
		// 	);
	}

	render() {
		// access pull errors state from state object
		const { errors } = this.state;
		let msg = Object.values(errors);

		return (
			<div className="register">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Sign Up</h1>
							<p className="lead text-center">Create your FilmFan account</p>
							<form noValidate onSubmit={this.onSubmit}>
								<div className="form-group">
									<input
										type="text"
										className={
											msg[0] && msg[0].name
												? 'form-control form-control-lg is-invalid'
												: 'form-control form-control-lg'
										}
										placeholder="Name"
										name="name"
										value={this.state.name}
										onChange={this.onChange}
									/>
									<div className="invalid-feedback">
										{msg[0] && msg[0].name ? msg[0].name : null}
									</div>
								</div>
								<div className="form-group">
									<input
										type="email"
										className={
											msg[0] && msg[0].email
												? 'form-control form-control-lg is-invalid'
												: 'form-control form-control-lg'
										}
										placeholder="Email Address"
										name="email"
										value={this.state.email}
										onChange={this.onChange}
									/>
									<div className="invalid-feedback">
										{msg[0] && msg[0].email ? msg[0].email : null}
									</div>
									<small className="form-text text-muted">
										This site uses Gravatar so if you want a profile image, use
										a Gravatar email
									</small>
								</div>
								<div className="form-group">
									<input
										type="password"
										className={
											msg[0] && msg[0].password
												? 'form-control form-control-lg is-invalid'
												: 'form-control form-control-lg'
										}
										placeholder="Password"
										name="password"
										value={this.state.password}
										onChange={this.onChange}
									/>
									<div className="invalid-feedback">
										{msg[0] && msg[0].password ? msg[0].password : null}
									</div>
								</div>
								<div className="form-group">
									<input
										type="password2"
										className={
											msg[0] && msg[0].password2
												? 'form-control form-control-lg is-invalid'
												: 'form-control form-control-lg'
										}
										placeholder="Confirm Password"
										name="password2"
										value={this.state.password2}
										onChange={this.onChange}
									/>
									<div className="invalid-feedback">
										{msg[0] && msg[0].password2 ? msg[0].password2 : null}
									</div>
								</div>
								<input type="submit" className="btn btn-info btn-block mt-4" />
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Register;
