import {paramToQuery} from '../utils/fetch';
import {FETCH_BLACKLIST_USER} from '../constants/blacklist';

const BLACK = 'user/black';

export const getBlacklist = json => {
  return {
    type: FETCH_BLACKLIST_USER,
    json,
  };
};

export function fetchBlacklistUser(phone) {
  const url = paramToQuery(
    `${BLACK}?pageNo=${1}&pageSize=${10}&phone=${phone}`,
  );
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
          dispatch(getBlacklist(data.data));
        }
      })
      .catch(e => {
        return Promise.reject(e.message);
      });
  };
}
