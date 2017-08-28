// action types
import {
	AUTH_USER,
	UNAUTH_USER
} from '../actions/types';

// auth reducers
export default function(state = {}, action) {
	switch(action.type) {
		case AUTH_USER:
			return { ...state, error: '', authenticated: true };
		case UNAUTH_USER:
			return { ...state, error: '', authenticated: false };
	}

	return state;
}