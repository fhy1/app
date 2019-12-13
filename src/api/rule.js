import {paramToQuery} from '../utils/fetch';

const RULE = 'rule/id';

export function fetchRule(ruleId) {
  const url = paramToQuery(`${RULE}?ruleId=${ruleId}`);
  console.log('url', url);
  return fetch(url)
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log('rule', data.status);
      console.log('rule', data);
      if (data.error) {
        return Promise.reject(data);
      } else {
        return data;
      }
    })
    .catch(e => {
      console.log('err1', e);
      return Promise.reject(e.message);
    });
}
