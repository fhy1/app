import {handleActions} from 'redux-actions';
import {
  FETCH_HOME_REQUEST,
  FETCH_HOME_SUCCESS,
  FETCH_HOME_FAILURE,
} from '../constants/home';

const INITIAL_STATE = {
  // 列表
  list: {
    isFetching: false,
    error: null,
    data: [],
  },
};

export default handleActions(
  {
    [FETCH_HOME_REQUEST]: (state, action) => ({
      ...state,
      list: {
        ...state.list,
        isFetching: !(action.meta && action.meta.refresh),
      },
    }),

    [FETCH_HOME_SUCCESS]: (state, action) => ({
      ...state,
      list: {
        ...state.list,
        isFetching: false,
        data: action.payload,
        error: null,
      },
    }),

    [FETCH_HOME_FAILURE]: (state, action) => ({
      ...state,
      list: {
        ...state.list,
        isFetching: false,
        error: action.payload,
        data: [],
      },
    }),
  },
  INITIAL_STATE,
);
