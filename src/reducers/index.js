import {combineReducers} from 'redux';
import home from './home';
import hall from './hall';
import extend from './extend';
import login from './login';

const rootReducers = combineReducers({home, hall, extend, login});

export default rootReducers;
