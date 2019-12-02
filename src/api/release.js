import {paramToQuery} from '../utils/fetch';

const JOB = 'job';

export function addNewJob(data) {
  const url = paramToQuery(`${JOB}`);
  console.log('url', url);
  return fetch(url, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-ApiAuth-Token': '',
    },
    body: JSON.stringify(data),
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log('JOB', data.status);
      console.log('JOB', data);
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
