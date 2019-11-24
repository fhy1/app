import {
  FETCH_OPTION_LIST,
  SUBMIT_OPTION,
  CLEAR_OPTION_LIST,
} from '../constants/option';

const INITIAL_STATE = {
  // 列表
  list: {
    isFetching: false,
    error: null,
  },
  option: {},
  optionList: [],
  addOption: {},
};

// 通过dispatch action进入
export default function update(state = INITIAL_STATE, action) {
  // 根据不同的action type进行state的更新
  switch (action.type) {
    case FETCH_OPTION_LIST:
      return Object.assign({}, state, {
        option: action.json.data,
        optionList: state.optionList.concat(
          action.json.data.list ? action.json.data.list : [],
        ),
      });
    case SUBMIT_OPTION:
      return Object.assign({}, state, {
        addOption: action.json.data,
      });
    case CLEAR_OPTION_LIST:
      return Object.assign({}, state, {
        optionList: [],
      });
    default:
      return state;
  } //invite
}
