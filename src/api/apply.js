import {paramToQuery} from '../utils/fetch';

const audit = 'job/release';

export function fetchAudit(pageNo, pageSize, auditStatus, userId) {
  const url = paramToQuery(
    `${audit}?pageNo=${pageNo}&pageSize=${pageSize}&userId=${userId}`,
  );
  console.log(url);
  return fetch(url)
    .then(res => {
      return res.json();
    })
    .then(data => {
      return data;
    })
    .catch(e => {
      console.log(e.message);
    });
}
