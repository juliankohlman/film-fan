import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import jwt_decode from 'jwt-decode';
import setAuthToken from './Utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/auth';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';

import './App.css';
import { clearProfile } from './actions/profile';
// import { decode } from 'iconv-lite';
const store = configureStore();

// Token check (persisting a user session)
if (localStorage.jwt) {
	// Assign auth token authorization
	setAuthToken(localStorage.jwt);
	// Decode token w/expiration
	const decoded = jwt_decode(localStorage.jwt);
	// Authenticate and set current user
	store.dispatch(setCurrentUser(decoded));
	// check on token expiration
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		// logout user
		store.dispatch(logoutUser());
		// clear current profile state
		store.dispatch(clearProfile());
		// redirect to homepage/login
		window.location.href = '/login';
	}
}

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div>
						<Navbar />
						<Route exact path="/" component={Landing} />
						<div className="container">
							<Route exact path="/register" component={Register} />
							<Route exact path="/login" component={Login} />
							<Route exact path="/dashboard" component={Dashboard} />
						</div>
						<Footer />
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
