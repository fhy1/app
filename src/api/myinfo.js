import {paramToQuery} from '../utils/fetch';
import {MYINFO_MONEY, MYINFO_CHART} from '../constants/myinfo';
const MONEY = 'money/all';
export const saveMoney = json => {
  console.log(111);
  return {
    type: MYINFO_MONEY,
    json,
  };
};

export const saveChart = json => {
  return {
    type: MYINFO_CHART,
    json,
  };
};

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
