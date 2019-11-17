import * as extendAPI from '../api/extend';

export function fetchExtendInvite() {
  return dispatch => dispatch(extendAPI.fetchExtendInvite());
}
export function fetchExtendUser(userId) {
  return dispatch => dispatch(extendAPI.fetchExtendUser(userId));
}
