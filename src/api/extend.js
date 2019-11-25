import {paramToQuery} from '../utils/fetch';
import {FETCH_EXTEND_INVITE, FETCH_EXTEND_USER} from '../constants/extend';

const INVITE = 'extend/invite';
const USER = 'extend/user';

export const getInvite = json => {
  return {
    type: FETCH_EXTEND_INVITE,
    json,
  };
};
export const getUser = json => {
  return {
    type: FETCH_EXTEND_USER,
    json,
  };
};

export function fetchExtendInvite() {
  const url = paramToQuery(`${INVITE}`);
  return fetch(url)
    .then(res => {
      return res.json();
    })
    .then(data => {
      if (data.error) {
        return Promise.reject(data);
      } else {
        return data;
      }
    })
    .catch(e => {
      return Promise.reject(e.message);
    });
}

export function fetchExtendUser(userId) {
  const url = paramToQuery(`${USER}?userId=${userId}`);
  return fetch(url)
    .then(res => {
      return res.json();
    })
    .then(data => {
      if (data.error) {
        return Promise.reject(data);
      } else {
        return data;
      }
    })
    .catch(e => {
      return Promise.reject(e.message);
    });
}
