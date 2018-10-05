import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/auth';
import TextFieldGroup from '../helpers/TextFieldGroup';

class Login extends Component {
	constructor() {
		super();

		this.state = {
			email: '',
			password: '',
			errors: {}
		};

		this.onSubmit = this.onSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	componentDidMount = () => {
		if (this.props.auth.isAuthenticated) this.props.history.push('/dashboard');
	};

	// ! replace with static getDerivedStateFromProp() method
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
		console.log(errors);

		return (
			<div className="login">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Log In</h1>
							<p className="lead text-center">Log in to your FilmFan account</p>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									type="email"
									placeholder="Email Address"
									name="email"
									value={this.state.email}
									onChange={this.handleChange}
									error={errors.email}
								/>

								<TextFieldGroup
									type="password"
									placeholder="Password"
									name="password"
									value={this.state.password}
									onChange={this.handleChange}
									error={errors.password}
								/>

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
