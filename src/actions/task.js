import * as taskAPI from '../api/task';

export function fetchTaskCode(pageNo, pageSize, userId, status) {
  return dispatch =>
    dispatch(taskAPI.fetchTaskCode(pageNo, pageSize, userId, status));
}
export function fetchTaskCodeNext(pageNo, pageSize, userId, status) {
  return dispatch =>
    dispatch(taskAPI.fetchTaskCodeNext(pageNo, pageSize, userId, status));
}
