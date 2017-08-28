import axios from 'axios';
import { browserHistory } from 'react-router';
import { 
	AUTH_USER, 
	UNAUTH_USER,
	FETCH_FEATURED,
	FETCH_DENTISTS,
	FETCH_FAVORITES,
	FETCH_DENTIST,
	TOGGLE_FAVORITE,
	FETCH_ERROR,
	CLEAR_ERROR,
	FETCH_LOCATIONS
} from './types';

import _ from 'lodash';

import config from '../config';

var AUTH_HEADER_OBJ = {
	headers: { 
		Authorization: localStorage.getItem('token') 
	}
}

function refreshToken() {
	AUTH_HEADER_OBJ.headers.Authorization = localStorage.getItem('token');
}

// ** redux thunk allows you to dispatch different actions in a single action creator using dispatch function **

// start of auth related actions
export function loginUser({ username, password, toggled}) {
	refreshToken();
	return function(dispatch) {	
		// submit username/password to server
		axios.post(`${config.ROOT_API_URL}/v1/login`, { username, password })
			.then((res) => {
				// save username and toggled status or remove it
				if(toggled) {
					localStorage.setItem('toggled', true);
					localStorage.setItem('username', username);
				} else {
					localStorage.removeItem('toggled');
					localStorage.removeItem('username');
				}
				// if request is good ...
				// - update state to indicate user is authed
				dispatch({ type: AUTH_USER });
				// - save the jwt token
				localStorage.setItem('token', res.data.token);
				// - save copy of my own user object
				localStorage.setItem('user', JSON.stringify(res.data.user));
				// - redirect to route /feature
				browserHistory.push('/app');
			})
			.catch((res) => {
				// if request is bad
				// - show error to the user
				dispatch(fetchError('Invalid login credentials.'));
			});
	}
}
export function registerUser({ first_name, last_name, email, username, password }) {
	refreshToken();
	return function(dispatch) {
		axios.post(`${config.ROOT_API_URL}/v1/register`, { first_name, last_name, email, username, password })
			.then((res) => {
				dispatch({ type: AUTH_USER });
				localStorage.setItem('token', res.data.token);
				localStorage.setItem('user', JSON.stringify(res.data.user));
				browserHistory.push('/app');
			})
			.catch((res) => {
				dispatch(new fetchError(res.data.error));
			});
	}
}

export function logoutUser() {
	localStorage.removeItem('token');
	localStorage.removeItem('user');
	browserHistory.push('/');
	return { type: UNAUTH_USER };
}

// app data fetch routes, require auth
export function fetchFeatured(queryString) {
	refreshToken();
	return function(dispatch) {
		axios.get(`${config.ROOT_API_URL}/v1/dentist?featured=true${queryString ? queryString : ''}`, AUTH_HEADER_OBJ)
		.then(res => {
			dispatch({
				type: FETCH_FEATURED,
				payload: res.data
			});
		});
	}
}
export function fetchDentists(queryString) {
	refreshToken();
	return function(dispatch) {
		axios.get(`${config.ROOT_API_URL}/v1/dentist${queryString || ''}`, AUTH_HEADER_OBJ)
		.then(res => {
			dispatch({
				type: FETCH_DENTISTS,
				payload: res.data
			});
		});
	}
}
export function fetchFavorites(queryString) {
	refreshToken();
	return function(dispatch) {
		axios.get(`${config.ROOT_API_URL}/v1/favorite${queryString || ''}`, AUTH_HEADER_OBJ)
		.then(res => {
			dispatch({
				type: FETCH_FAVORITES,
				payload: res.data
			});
		});
	}
}
export function toggleFavorite(dentistId) {
	refreshToken();
	return function(dispatch) {
		axios.post(`${config.ROOT_API_URL}/v1/favorite`, {"fav_id": dentistId}, AUTH_HEADER_OBJ)
		.then((res) => {
			dispatch({ type: TOGGLE_FAVORITE });
			if(res.data.error) {
				dispatch(new fetchError(res.data.error));
			} else {
				console.log('action ', res.data);
				localStorage.setItem('user', JSON.stringify(res.data));
			}
		})
		.catch((res) => {
			dispatch(new fetchError(res.data));
		});
	}
}
export function fetchDentist(dentistId) {
	refreshToken();
	return function(dispatch) {
		axios.get(`${config.ROOT_API_URL}/v1/dentist?id=${dentistId}`, AUTH_HEADER_OBJ)
		.then(res => {
			dispatch({
				type: FETCH_DENTIST,
				payload: res.data[0]
			});
		});
	}
}

export function fetchError(error) {
	return {
		type: FETCH_ERROR,
		payload: error
	}
}
export function clearError() {
	return {
		type: CLEAR_ERROR
	}
}

export function fetchLocations(locationString) {
	return function(dispatch) {
		axios.get(`${config.ROOT_API_URL}/v1/location?location=${locationString}`, AUTH_HEADER_OBJ)
		.then(res => {
			dispatch({
				type: FETCH_LOCATIONS,
				// select only five objects from response, filter out objects that don't have locations/coords
				payload: res.data
			});
		});
	}
}
