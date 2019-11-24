import * as optionAPI from '../api/option';

export function fetchOptionAll(pageNo, pageSize) {
  return dispatch => dispatch(optionAPI.fetchOptionAll(pageNo, pageSize));
}
export function addOneOptions(userId, opinion) {
  return dispatch => dispatch(optionAPI.addOneOptions(userId, opinion));
}
export function clearOption() {
  return dispatch => dispatch(optionAPI.clearOption());
}
