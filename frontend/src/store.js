import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';

import createLogger from 'redux-logger';
const logger = createLogger();

// create store
const createStoreWithMiddleware = applyMiddleware(reduxThunk, /*logger*/)(createStore);

export default createStoreWithMiddleware(reducers);