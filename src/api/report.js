import {paramToQuery} from '../utils/fetch';

const REPORT = 'report';

export function report(userId, taskId, reportReason, reportImg) {
  const url = paramToQuery(
    `${REPORT}?userId=${userId}&taskId=${taskId}&reportReason=${reportReason}&reportImg=${reportImg}`,
  );
  console.log(url);
  return fetch(url, {
    method: 'post',
  })
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
      console.log('err1', e);
      return Promise.reject(e.message);
    });
}
