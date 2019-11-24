import {FETCH_EXTEND_INVITE} from '../constants/extend';
import {FETCH_EXTEND_USER} from '../constants/extend';

const INITIAL_STATE = {
  // 列表
  list: {
    isFetching: false,
    error: null,
  },
  invite: [],
  user: {totalNum: 0, totalMoney: 0},
};

// 通过dispatch action进入
export default function update(state = INITIAL_STATE, action) {
  // 根据不同的action type进行state的更新
  switch (action.type) {
    case FETCH_EXTEND_INVITE:
      return Object.assign({}, state, {invite: action.json.data});
    case FETCH_EXTEND_USER:
      return Object.assign({}, state, {
        user: action.json.data ? action.json.data : state.user,
      });
    default:
      return state;
  } //invite
}
