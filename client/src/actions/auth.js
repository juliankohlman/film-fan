export const register = jwt => ({
	type: 'REGISTER',
	jwt
});

export const registerUser = userData => {
	return {
		type: REGISTER,
		payload: userData
	};
};
