import {combineReducers} from 'redux';
import home from './home';
import hall from './hall';
import extend from './extend';
import login from './login';
import blacklist from './blacklist';

const rootReducers = combineReducers({home, hall, extend, login, blacklist});

export default rootReducers;
