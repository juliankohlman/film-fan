import isEmpty from '../validation/is-empty';
import { SET_CURRENT_USER } from '../actions/types';

const initState = {
	isAuthenticated: false,
	user: {}
};

// * Todo add notes on reducers/actions:action creators/async actions (thunks)
export default (state = initState, action) => {
	switch (action.type) {
		case SET_CURRENT_USER:
			return {
				...state,
				isAuthenticated: !isEmpty(action.payload),
				user: action.payload
			};
		default:
			return state;
	}
};
