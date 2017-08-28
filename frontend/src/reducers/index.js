import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import appReducer from './app_reducer';
import errorReducer from './error_reducer';

// combinde reducers from different files
const rootReducer = combineReducers({
 	form,
 	auth: authReducer,
 	app: appReducer,
 	error: errorReducer
});

export default rootReducer;
