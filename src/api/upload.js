import {paramToQuery} from '../utils/fetch';
import {FETCH_TASK_JOB, FETCH_TASK_JOB_NEXT} from '../constants/task';

const UPLOAD = 'upload/singleImg';

export function upLoadImg(data) {
  const url = paramToQuery(`${UPLOAD}`);
  let formdata = new FormData();
  formdata.append('file', data);
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data;charset=utf-8',
    },
    body: formdata,
  })
    .then(res => {
      console.log(res);
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
      console.log('err1', e.message);
      return Promise.reject(e.message);
    });
}
