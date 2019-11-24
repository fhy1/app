import {paramToQuery} from '../utils/fetch';
import {FETCH_INVITE_RULE} from '../constants/invite';

const RULE = 'rule/id';

export const getInvite = json => {
  return {
    type: FETCH_INVITE_RULE,
    json,
  };
};

export function fetchInviteRule() {
  const url = paramToQuery(`${RULE}?ruleId=7`);
  console.log('url', url);
  return dispatch => {
    return fetch(url)
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log('invite', data.status);
        console.log('invite', data);
        if (data.error) {
          return Promise.reject(data);
        } else {
          dispatch(getInvite(data));
        }
      })
      .catch(e => {
        console.log('err1', e.message);
        return Promise.reject(e.message);
      });
  };
}