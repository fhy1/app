import {paramToQuery} from '../utils/fetch';
import {
  FETCH_USER_CODE,
  FETCH_USER_CHECKCODE,
  FETCH_USER_LOGIN,
} from '../constants/login';
import {saveStorage} from '../utils/storage';

const CODE = 'user/code';
const CHECKCODE = 'user/checkCode';
const ENROLL = 'user/enroll';

export const getCode = json => {
  return {
    type: FETCH_USER_CODE,
    json,
  };
};
export const getCheckCode = json => {
  return {
    type: FETCH_USER_CHECKCODE,
    json,
  };
};
export const getLogin = json => {
  return {
    type: FETCH_USER_LOGIN,
    json,
  };
};
export function fetchUserCode(phone) {
  const url = paramToQuery(`${CODE}?phone=${phone}`);
  console.log('url', url);
  return fetch(url)
    .then(res => {
      console.log(res.status);
      return res.json();
    })
    .then(data => {
      console.log('code', data);
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

export function fetchCheckCode(data) {
  const url = paramToQuery(
    `${CHECKCODE}?phone=${data.phone}&code=${data.code}`,
  );
  console.log('url', url);
  return fetch(url)
    .then(res => {
      console.log(res.status);
      return res.json();
    })
    .then(data => {
      console.log('checkcode', data);
      if (data.error) {
        return Promise.reject(data);
      } else {
        return data;
      }
    })
    .catch(e => {
      console.log(e.message);
      return Promise.reject(e.message);
    });
}

export function fetchCheckEnroll(data) {
  const url = paramToQuery(`${ENROLL}?phone=${data.phone}`);
  console.log('url', url);
  return fetch(url)
    .then(res => {
      console.log(res.status);
      return res.json();
    })
    .then(async data => {
      console.log('enroll', data);
      if (data.error) {
        return Promise.reject(data);
      } else {
        await saveStorage('userNews', data);
        return data;
      }
    })
    .catch(e => {
      console.log(e.message);
      return Promise.reject(e.message);
    });
}
