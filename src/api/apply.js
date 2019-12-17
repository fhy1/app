import {paramToQuery} from '../utils/fetch';

const USERJOB = 'job/userJob';

export function fetchAudit(pageNo, pageSize, userId, status) {
  const url = paramToQuery(
    `${USERJOB}?pageNo=${pageNo}&pageSize=${pageSize}&userId=${userId}&status=${status}`,
  );
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

export function editAudit(taskId, status, refuseReason) {
  const url = paramToQuery(
    `${USERJOB}?taskId=${taskId}&status=${status}&refuseReason=${refuseReason}`,
  );
  return fetch(url, {
    method: 'PUT',
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
      return Promise.reject(e.message);
    });
}
