import {
  FETCH_USER_CODE,
  FETCH_USER_CHECKCODE,
  FETCH_USER_LOGIN,
} from '../constants/login';

const INITIAL_STATE = {
  // 列表
  list: {
    isFetching: false,
    error: null,
    code: {},
    checkCode: {},
    login: {},
  },
};

// 通过dispatch action进入
export default function update(state = INITIAL_STATE, action) {
  // 根据不同的action type进行state的更新
  switch (action.type) {
    case FETCH_USER_CODE:
      return Object.assign({}, state, {code: action.json});
    case FETCH_USER_CHECKCODE:
      return Object.assign({}, state, {checkCode: action.json});
    case FETCH_USER_LOGIN:
      return Object.assign({}, state, {login: action.json});
    default:
      return state;
  } //invite
}
