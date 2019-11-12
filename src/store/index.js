import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const middlewares = [];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(thunk, logger);
}

const store = createStore(reducers, applyMiddleware(r...middlewares));

export {store};
