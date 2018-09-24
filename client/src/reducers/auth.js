const initState = {
	isAuthenticated: false,
	user: {}
};

export default (state = initState, action) => {
	switch (action.type) {
		case 'REGISTER':
			return {
				jwt: action.jwt
			};
		default:
			return state;
	}
};
