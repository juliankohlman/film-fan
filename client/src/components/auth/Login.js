import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/auth';

class Login extends Component {
	constructor() {
		super();

		this.state = {
			email: '',
			password: '',
			errors: {}
		};

		this.onSubmit = this.onSubmit.bind(this);
	}

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	componentDidMount = () => {
		if (this.props.auth.isAuthenticated) this.props.history.push('/dashboard');
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}

		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors
			});
		}
	}

	onSubmit(e) {
		e.preventDefault();

		const userData = {
			email: this.state.email,
			password: this.state.password
		};

		this.props.loginUser(userData);
	}

	render() {
		const { errors } = this.state;
		let msg = Object.values(errors);
		console.log('msg: ', msg);

		return (
			<div className="login">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Log In</h1>
							<p className="lead text-center">Log in to your FilmFan account</p>
							<form onSubmit={this.onSubmit}>
								<div className="form-group">
									<input
										type="email"
										className={
											msg.length > 0
												? 'form-control form-control-lg is-invalid'
												: 'form-control form-control-lg'
										}
										placeholder="Email Address"
										name="email"
										value={this.state.email}
										onChange={this.handleChange}
									/>
									<div className="invalid-feedback">
										{msg[0] && msg[0].email ? msg[0].email : null}
									</div>
								</div>
								<div className="form-group">
									<input
										type="password"
										className={
											msg.length > 0
												? 'form-control form-control-lg is-invalid'
												: 'form-control form-control-lg'
										}
										placeholder="Password"
										name="password"
										value={this.state.password}
										onChange={this.handleChange}
									/>
									<div className="invalid-feedback">
										{typeof msg[0] === 'string'
											? msg[0]
											: typeof msg[0] === 'object'
												? msg[0].password
												: null}
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

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ loginUser }
)(Login);
