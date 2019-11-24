import * as inviteAPI from '../api/invite';

export function fetchInviteRule() {
  return dispatch => dispatch(inviteAPI.fetchInviteRule());
}
