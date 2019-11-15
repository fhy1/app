import {FETCH_EXTEND_INVITE} from '../constants/extend';

const INITIAL_STATE = {
  // 列表
  list: {
    isFetching: false,
    error: null,
    invite: [{userId: 0}],
  },
};

// 通过dispatch action进入
export default function update(state = INITIAL_STATE, action) {
  console.log(11111);
  // 根据不同的action type进行state的更新
  switch (action.type) {
    case FETCH_EXTEND_INVITE:
      console.log('xxxxx');
      return Object.assign({}, state, {invite: action.json.data});
    default:
      return state;
  } //invite
}
