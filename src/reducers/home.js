import {
  FETCH_HOME_IMG,
  FETCH_HOME_SIGNIN,
  HOME_SIGNIN,
  HOME_SIGNIN_RECOMMEND,
} from '../constants/home';

const INITIAL_STATE = {
  // 列表
  list: {
    isFetching: false,
    error: null,
  },
  img: [],
  recommendList: [],
  signStatus: 0,
};

// 通过dispatch action进入
export default function update(state = INITIAL_STATE, action) {
  // 根据不同的action type进行state的更新
  switch (action.type) {
    case FETCH_HOME_IMG:
      return Object.assign({}, state, {img: action.json.data});
    case FETCH_HOME_SIGNIN:
      return Object.assign({}, state, {signStatus: action.json.data});
    case HOME_SIGNIN:
      return Object.assign({}, state, {signStatus: 1});
    case HOME_SIGNIN_RECOMMEND:
      console.log('List', action.json.data.list);
      return Object.assign({}, state, {recommendList: action.json.data.list});
    default:
      return state;
  } //invite
}
