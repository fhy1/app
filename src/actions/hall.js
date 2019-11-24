import * as hallAPI from '../api/hall';

export function fetchHalljob(pageNo, pageSize, labelStatus, typeId) {
  return dispatch =>
    dispatch(hallAPI.fetchHalljob(pageNo, pageSize, labelStatus, typeId));
}
export function fetchHalljobNext(pageNo, pageSize, labelStatus, typeId) {
  return dispatch =>
    dispatch(hallAPI.fetchHalljobNext(pageNo, pageSize, labelStatus, typeId));
}
export function fetchHallType() {
  return dispatch => dispatch(hallAPI.fetchHallType());
}
export function fetchHallDetail(jobId, userId) {
  return dispatch => dispatch(hallAPI.fetchHallDetail(jobId, userId));
}
export function fetchHallSignUp(jobId, userId) {
  return dispatch => dispatch(hallAPI.fetchHallSignUp(jobId, userId));
}
