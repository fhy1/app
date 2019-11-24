import {paramToQuery} from '../utils/fetch';
import {
  FETCH_BLACKLIST_USER,
  CLEAR_BLACKLIST_USER,
} from '../constants/blacklist';

const BLACK = 'user/black';

export const getBlacklist = json => {
  return {
    type: FETCH_BLACKLIST_USER,
    json,
  };
};
export const clearBlacklist = () => {
  return {
    type: CLEAR_BLACKLIST_USER,
  };
};

export function fetchBlacklistUser(pageNo, pageSize) {
  const url = paramToQuery(`${BLACK}?pageNo=${pageNo}&pageSize=${pageSize}`);
  console.log('url', url);
  return dispatch => {
    return fetch(url)
      .then(res => {
        console.log(res.status);
        return res.json();
      })
      .then(async data => {
        console.log('blacklist', data);
        if (data.error) {
          return Promise.reject(data);
        } else {
          dispatch(getBlacklist(data));
        }
      })
      .catch(e => {
        return Promise.reject(e.message);
      });
  };
}
