import {
  FETCH_HALL_JOB,
  FETCH_HALL_TYPE,
  FETCH_HALL_JOB_NEXT,
  FETCH_HALL_JOB_DETAIL,
  CLEAR_LIST,
  HALL_SIGN_UP,
} from '../constants/hall';

const INITIAL_STATE = {
  // 列表
  list: {
    isFetching: false,
    error: null,
    data: {},
  },
  job: {},
  jobList: [],
  type: [],
  jobDetail: {},
  jobStepList: [],
  signUp: {},
};

// 通过dispatch action进入
export default function update(state = INITIAL_STATE, action) {
  // 根据不同的action type进行state的更新
  switch (action.type) {
    case FETCH_HALL_JOB:
      return Object.assign({}, state, {
        job: action.json.data,
        jobList: action.json.data.list ? action.json.data.list : [],
      });
    case FETCH_HALL_JOB_NEXT:
      return Object.assign({}, state, {
        job: action.json.data,
        jobList: state.jobList.concat(
          action.json.data.list ? action.json.data.list : [],
        ),
      });
    case FETCH_HALL_TYPE:
      return Object.assign({}, state, {type: action.json.data});
    case FETCH_HALL_JOB_DETAIL:
      return Object.assign({}, state, {
        jobDetail: action.json.data,
        jobStepList: action.json.data.jobStepList,
      });
    case CLEAR_LIST:
      return Object.assign({}, state, {
        jobList: [],
      });
    case HALL_SIGN_UP:
      return Object.assign({}, state, {
        signUp: action.json.data,
      });
    default:
      return state;
  }
}
