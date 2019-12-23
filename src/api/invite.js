import {paramToQuery} from '../utils/fetch';
import {FETCH_INVITE_RULE} from '../constants/invite';

const RULE = 'rule/id';
const EXTEND = 'extend/details';

export const getInvite = json => {
  return {
    type: FETCH_INVITE_RULE,
    json,
  };
};

export function fetchInviteRule() {
  const url = paramToQuery(`${RULE}?ruleId=7`);
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

export function fetchInviteAll(userId, pageNo, pageSize) {
  const url = paramToQuery(
    `${EXTEND}?userId=${userId}&pageNo=${pageNo}&pageSize=${pageSize}`,
  );
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
