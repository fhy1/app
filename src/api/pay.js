import {paramToQuery} from '../utils/fetch';

const WX = 'user/wxRecharge';
const ZFB = 'user/zfbRecharge';
const BALANCE = 'user/balanceRecharge';

export function getWxPay(userId, money, type, mold) {
  const url = paramToQuery(
    `${WX}?userId=${userId}&money=${money}&type=${type}&mold=${mold}`,
  );
  console.log('url', url);
  return fetch(url)
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log('WX', data.status);
      console.log('WX', data);
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

export function getZfbPay(userId, money, type, mold) {
  const url = paramToQuery(
    `${ZFB}?userId=${userId}&money=${money}&type=${type}&mold=${mold}`,
  );
  console.log('url', url);
  return fetch(url)
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log('ZFB', data.status);
      console.log('ZFB', data);
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

export function banancePay(userId, money, mold) {
  const url = paramToQuery(
    `${BALANCE}?userId=${userId}&money=${money}&mold=${mold}`,
  );
  console.log('url', url);
  return fetch(url)
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log('BALANCE', data.status);
      console.log('BALANCE', data);
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
