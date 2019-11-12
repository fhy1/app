import { handleActions } from 'redux-actions';
import {
  FETCH_HALL_REQUEST,
  FETCH_HALL_SUCCESS,
  FETCH_HALL_FAILURE,
} from '../constants/hall';

const INITIAL_STATE = {
  // 列表
  list: {
    isFetching: false,
    error: null,
    data: {},
  },
};

// 通过dispatch action进入
export default function update(state = INITIAL_STATE, action) {

  // 根据不同的action type进行state的更新
  switch (action.type) {
    case FETCH_HALL_SUCCESS:
      return Object.assign({}, state, { data: action.json.data })
    default:
      return state
  }
}