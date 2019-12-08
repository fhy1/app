import {combineReducers} from 'redux';
import home from './home';
// import hall from './hall';
// import extend from './extend';
import login from './login';
import myinfo from './myinfo';
// import blacklist from './blacklist';
// import task from './task';
// import invite from './invite';
// import option from './option';

const rootReducers = combineReducers({
  home,
  login,
  myinfo,
});

export default rootReducers;
