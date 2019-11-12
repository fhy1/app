import { combineReducers } from 'redux';
import home from './home';
import hall from './hall';

const rootReducers = combineReducers({ home, hall });

export default rootReducers;
