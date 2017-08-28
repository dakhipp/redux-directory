import {
	FETCH_ERROR,
	CLEAR_ERROR
} from '../actions/types';

// auth reducers
export default function(state = {}, action) {
	switch(action.type) {
		case FETCH_ERROR:
			return { ...state, error: action.payload };
		case CLEAR_ERROR: 
			return { ...state, error: false };
	}

	return state;
}