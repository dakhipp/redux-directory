// action types
import _ from 'lodash';
import {
	FETCH_FEATURED,
	FETCH_DENTISTS,
	FETCH_FAVORITES,
	FETCH_DENTIST,
	TOGGLE_FAVORITE,
	FETCH_LOCATIONS
} from '../actions/types';

const INITIAL_STATE = {
	selected: {},
	featured: {},
	dentists: {},
	favorites: {},
	locations: {}
};

// auth reducers
export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case FETCH_DENTIST: 
			return { ...state, selected: action.payload };
		case FETCH_FEATURED:
			const newFeatured = _.mapKeys(action.payload, '_id');
			return { ...state, featured: { ...newFeatured } };
		case FETCH_DENTISTS:
			const newDentists = _.mapKeys(action.payload, '_id');
			return { ...state, dentists: { ...newDentists } };
		case FETCH_FAVORITES:
			const newFavorites = _.mapKeys(action.payload, '_id');
			return { ...state, favorites: { ...newFavorites } };	
		case FETCH_LOCATIONS: 
			const newLocations = _.mapKeys(action.payload, 'uid');
			return { ...state, locations: { ...newLocations } };
		case TOGGLE_FAVORITE:
			return { ...state };
		default:
			return state;
	}
	return state;
}