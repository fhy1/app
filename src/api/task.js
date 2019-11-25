import {paramToQuery} from '../utils/fetch';
import {FETCH_TASK_JOB, FETCH_TASK_JOB_NEXT} from '../constants/task';

const CODE = 'job/user';

export const getCode = json => {
  return {
    type: FETCH_TASK_JOB,
    json,
  };
};

export const getTaskCode = json => {
  return {
    type: FETCH_TASK_JOB_NEXT,
    json,
  };
};

export function fetchTaskCode(pageNo, pageSize, userId, status) {
  const url = paramToQuery(
    `${CODE}?pageNo=${pageNo}&pageSize=${pageSize}&userId=${userId}&status=${status}`,
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
      console.log('err1', e.message);
      return Promise.reject(e.message);
    });
}
