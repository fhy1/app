import * as homeAPI from '../api/home';

export function fetchHomeImg() {
  return dispatch => dispatch(homeAPI.fetchHomeImg());
}
export function fetchHomeSignIn(userId) {
  return dispatch => dispatch(homeAPI.fetchHomeSignIn(userId));
}
export function SignInHome(userId) {
  return dispatch => dispatch(homeAPI.SignInHome(userId));
}
export function fetchHomeRecommend(pageNo, pageSize) {
  return dispatch => dispatch(homeAPI.fetchHomeRecommend(pageNo, pageSize));
}
