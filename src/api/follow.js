import {paramToQuery} from '../utils/fetch';

const FOLLOW = 'follow';
const ISFLLOW = 'follow/isFollow';
const ALL = 'follow/all';

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

export function isFollow(userId, followId) {
  const url = paramToQuery(`${ISFLLOW}?userId=${userId}&followId=${followId}`);
  console.log('url', url);
  return fetch(url)
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

export function delFollow(userId, followId) {
  const url = paramToQuery(`${FOLLOW}?userId=${userId}&followId=${followId}`);
  console.log('url', url);
  return fetch(url, {
    method: 'delete',
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

export function allFollow(userId, pageNo, pageSize) {
  const url = paramToQuery(
    `${ALL}?userId=${userId}&pageNo=${pageNo}&pageSize=${pageSize}`,
  );
  console.log('url', url);
  return fetch(url)
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log('all', data.status);
      console.log('all', data);
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
