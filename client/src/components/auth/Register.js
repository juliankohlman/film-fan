import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/auth';
import TextFieldGroup from '../helpers/TextFieldGroup';

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

	componentDidMount = () => {
		if (this.props.auth.isAuthenticated) this.props.history.push('/dashboard');
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors
			});
		}
	}

	handleChange = e => {
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

		// redirect from with registerUser action
		this.props.registerUser(newUser, this.props.history);
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
								<TextFieldGroup
									type="name"
									placeholder="Name"
									name="name"
									value={this.state.name}
									onChange={this.handleChange}
									msg={msg}
								/>
								<TextFieldGroup
									type="email"
									placeholder="Email Address"
									name="email"
									value={this.state.email}
									onChange={this.handleChange}
									msg={msg}
									info="This site uses Gravatar please use a Gravatar linked email account to display your Gravatar. "
								/>
								<TextFieldGroup
									type="password"
									placeholder="Password"
									name="password"
									value={this.state.password}
									onChange={this.handleChange}
									msg={msg}
								/>
								<TextFieldGroup
									type="password"
									placeholder="Confirm Password"
									name="password2"
									value={this.state.password2}
									onChange={this.handleChange}
									msg={msg}
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
	{ registerUser }
)(withRouter(Register));
