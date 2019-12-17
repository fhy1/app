import {paramToQuery} from '../utils/fetch';

const FOLLOW = 'follow';
const ISFLLOW = 'follow/isFollow';
const ALL = 'follow/all';

export function addFollow(userId, followId) {
  const url = paramToQuery(`${FOLLOW}?userId=${userId}&followId=${followId}`);
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
      return Promise.reject(e.message);
    });
}

export function isFollow(userId, followId) {
  const url = paramToQuery(`${ISFLLOW}?userId=${userId}&followId=${followId}`);
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

export function delFollow(userId, followId) {
  const url = paramToQuery(`${FOLLOW}?userId=${userId}&followId=${followId}`);
  return fetch(url, {
    method: 'delete',
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

export function allFollow(userId, pageNo, pageSize) {
  const url = paramToQuery(
    `${ALL}?userId=${userId}&pageNo=${pageNo}&pageSize=${pageSize}`,
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
