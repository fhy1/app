import * as blacklistAPI from '../api/blacklist';

export function fetchBlacklistUser(pageNo, pageSize) {
  return dispatch =>
    dispatch(blacklistAPI.fetchBlacklistUser(pageNo, pageSize));
}
