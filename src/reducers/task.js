import {FETCH_TASK_JOB, FETCH_TASK_JOB_NEXT} from '../constants/task';

const INITIAL_STATE = {
  // 列表
  list: {
    isFetching: false,
    error: null,
  },
  task: {},
  taskList: [],
};

// 通过dispatch action进入
export default function update(state = INITIAL_STATE, action) {
  // 根据不同的action type进行state的更新
  switch (action.type) {
    case FETCH_TASK_JOB:
      return Object.assign({}, state, {
        task: action.json.data,
        taskList: action.json.data.list ? action.json.data.list : [],
      });
    case FETCH_TASK_JOB_NEXT:
      return Object.assign({}, state, {
        task: action.json.data,
        taskList: state.jobList.concat(
          action.json.data.list ? action.json.data.list : [],
        ),
      });
    default:
      return state;
  } //invite
}
