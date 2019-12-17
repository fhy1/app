import {paramToQuery} from '../utils/fetch';

const RULE = '/rule';

export function fetchRule(data) {
  const url = paramToQuery(`${RULE}`);
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
