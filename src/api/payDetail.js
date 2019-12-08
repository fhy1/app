import {paramToQuery} from '../utils/fetch';

const MONEYDETAIL = 'money/details';

export function getMoneyDetail(userId, pageNo, pageSize) {
  const url = paramToQuery(
    `${MONEYDETAIL}?userId=${userId}&pageNo=${pageNo}&pageSize=${pageSize}`,
  );
  console.log('url', url);
  return fetch(url)
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log('details', data.status);
      console.log('details', data);
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
