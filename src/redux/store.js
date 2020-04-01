import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger'; // middleware die uns irgendwas über actions verrät

import rootReducer from './root-reducer';

const middlewares = [logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
