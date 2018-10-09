import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import jwt_decode from 'jwt-decode';
import setAuthToken from './Utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/auth';

import PrivateRoute from './components/helpers/PrivateRoute';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import Profile from './components/profile/Profile';
import Profiles from './components/profiles/Profiles';

import './App.css';
import { clearProfile } from './actions/profile';
import CreateProfile from './components/profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddReview from './components/add-review/AddReview';
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
							<Route exact path="/profile/:handle" component={Profile} />
							<Route exact path="/profiles" component={Profiles} />
							<Switch>
								<PrivateRoute exact path="/dashboard" component={Dashboard} />
							</Switch>
							<Switch>
								<PrivateRoute
									exact
									path="/create-profile"
									component={CreateProfile}
								/>
							</Switch>
							<Switch>
								<PrivateRoute
									exact
									path="/edit-profile"
									component={EditProfile}
								/>
							</Switch>
							<Switch>
								<PrivateRoute exact path="/add-review" component={AddReview} />
							</Switch>
						</div>
						<Footer />
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
