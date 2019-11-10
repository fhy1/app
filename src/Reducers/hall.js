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

export default handleActions(
  {
    [FETCH_HALL_REQUEST]: (state, action) => ({
      ...state,
      list: {
        ...state.list
      },
    }),

    FETCH_HALL_SUCCESS: (state, action) => ({
      ...state,
      list: {
        ...state.list,
        isFetching: false,
        data: action.payload,
        error: null,
      },
    }),

    [FETCH_HALL_FAILURE]: (state, action) => ({
      ...state,
      list: {
        ...state.list,
        isFetching: false,
        error: action.payload,
        data: {},
      },
    }),
  },
  INITIAL_STATE,
);
