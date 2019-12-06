import {paramToQuery} from '../utils/fetch';
const MONEY = 'money/all';

export function fetchMoneyAll(userId) {
  const url = paramToQuery(`${MONEY}?userId=${userId}`);
  console.log('url', url);
  return fetch(url)
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log('money', data.status);
      console.log('money', data);
      if (data.error) {
        return Promise.reject(data);
      } else {
        return data;
      }
    })
    .catch(e => {
      console.log('err1', e.message);
      return Promise.reject(e.message);
    });
}
