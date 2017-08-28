import store from '../store'
import { fetchFeatured, fetchDentists, fetchFavorites, fetchDentist } from '../actions';

export function onFeaturedEnter() {
	store.dispatch(fetchFeatured());
}

export function onDentistsEnter() {
	store.dispatch(fetchDentists());
}

export function onFavoritesEnter() {
	store.dispatch(fetchFavorites());
}

export function onDentistViewEnter(nextState) {
	store.dispatch(fetchDentist(nextState.params.dentistId));
}