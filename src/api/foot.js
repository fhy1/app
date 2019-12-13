import {paramToQuery} from '../utils/fetch';

const FOOT = 'job/footprint';

export function fetchFoot(data) {
  const url = paramToQuery(
    `${FOOT}?userId=${data.userId}&pageNo=${data.page}&pageSize=${data.size}`,
  );
  console.log(url);
  return fetch(url)
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log(data);
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
