import {paramToQuery} from '../utils/fetch';

const JOB = 'job';
const RELEASE = 'job/release';
const END = '/job/end';

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

export function fetchJobRelease(userId, auditStatus, pageNo, pageSize) {
  const url = paramToQuery(
    `${RELEASE}?userId=${userId}&auditStatus=${auditStatus}&pageNo=${pageNo}&pageSize=${pageSize}`,
  );
  console.log('url', url);
  return fetch(url)
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log('release', data.status);
      console.log('release', data);
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

export function fetchReleaseEnd(userId, pageNo, pageSize) {
  const url = paramToQuery(
    `${END}?userId=${userId}&pageNo=${pageNo}&pageSize=${pageSize}`,
  );
  console.log('url', url);
  return fetch(url)
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log('end', data.status);
      console.log('end', data);
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
