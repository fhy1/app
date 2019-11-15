import {combineReducers} from 'redux';
import home from './home';
import hall from './hall';
import extend from './extend';

const rootReducers = combineReducers({home, hall, extend});

export default rootReducers;
