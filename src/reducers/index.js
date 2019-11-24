import {combineReducers} from 'redux';
import home from './home';
import hall from './hall';
import extend from './extend';
import login from './login';
import blacklist from './blacklist';
import task from './task';
import invite from './invite';
import option from './option';

const rootReducers = combineReducers({
  home,
  hall,
  extend,
  login,
  blacklist,
  task,
  invite,
  option,
});

export default rootReducers;
