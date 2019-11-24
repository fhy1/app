import {
  FETCH_BLACKLIST_USER,
  CLEAR_BLACKLIST_USER,
} from '../constants/blacklist';

const INITIAL_STATE = {
  // 列表
  list: {
    isFetching: false,
    error: null,
  },
  black: {},
  blacklist: [],
};

// 通过dispatch action进入
export default function update(state = INITIAL_STATE, action) {
  // 根据不同的action type进行state的更新
  switch (action.type) {
    case FETCH_BLACKLIST_USER:
      return Object.assign({}, state, {
        black: action.json.data,
        blacklist: state.blacklist.concat(
          action.json.data.list ? action.json.data.list : [],
        ),
      });
    case CLEAR_BLACKLIST_USER:
      return Object.assign({}, state, {
        blacklist: [],
      });
    default:
      return state;
  } //invite
}
