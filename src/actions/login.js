import * as loginAPI from '../api/login';

export function fetchUserCode(phone) {
  return dispatch => dispatch(loginAPI.fetchUserCode(phone));
}
export function fetchCheckCode(data) {
  return dispatch => dispatch(loginAPI.fetchCheckCode(data));
}
export function fetchCheckEnroll(data) {
  return dispatch => dispatch(loginAPI.fetchCheckEnroll(data));
}
