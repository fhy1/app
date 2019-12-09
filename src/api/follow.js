import {paramToQuery} from '../utils/fetch';

const FOLLOW = 'follow';

export function addFollow(userId, followId) {
  const url = paramToQuery(`${FOLLOW}?userId=${userId}&followId=${followId}`);
  console.log('url', url);
  return fetch(url, {
    method: 'post',
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log('follow', data.status);
      console.log('follow', data);
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
