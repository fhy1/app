import * as blacklistAPI from '../api/blacklist';

export function fetchBlacklistUser() {
  return dispatch => dispatch(blacklistAPI.fetchBlacklistUser());
}
