import {FETCH_INVITE_RULE} from '../constants/invite';

const INITIAL_STATE = {
  // 列表
  inviteRule: [],
};

// 通过dispatch action进入
export default function update(state = INITIAL_STATE, action) {
  // 根据不同的action type进行state的更新
  switch (action.type) {
    case FETCH_INVITE_RULE:
      return Object.assign({}, state, {inviteRule: action.json.data});
    default:
      return state;
  } //invite
}
