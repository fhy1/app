import {MYINFO_MONEY, MYINFO_CHART} from '../constants/myinfo';

const INITIAL_STATE = {
  money: {
    balance: 0,
    repaidBalance: 0,
    bonus: 0,
  },
  chartNum: 0,
};

// 通过dispatch action进入
export default function update(state = INITIAL_STATE, action) {
  // 根据不同的action type进行state的更新
  switch (action.type) {
    case MYINFO_MONEY:
      return Object.assign({}, state, {money: action.json});
    case MYINFO_CHART:
      return Object.assign({}, state, {chartNum: action.json});
    default:
      return state;
  } //invite
}
