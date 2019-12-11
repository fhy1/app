import {paramToQuery} from '../utils/fetch';

const REPORT = 'report';
const REPORTUSER = 'report/user/all';

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

export function fetchUserReport(userId, reportStatus, pageNo, pageSize) {
  const url = paramToQuery(
    `${REPORTUSER}?userId=${userId}&reportStatus=${reportStatus}&pageNo=${pageNo}&pageSize=${pageSize}`,
  );
  console.log(url);
  return fetch(url, {
    method: 'get',
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      if (data.error) {
        return Promise.reject(data);
      } else {
        console.log(data);
        return data;
      }
    })
    .catch(e => {
      console.log('err1', e);
      return Promise.reject(e.message);
    });
}
