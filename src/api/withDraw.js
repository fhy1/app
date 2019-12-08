import {paramToQuery} from '../utils/fetch';
import {setData} from '../utils/storage';

const WXLOGIN = 'user/weChatLogin';
const CASHOUT = 'cashOut';

export function wxBind(code, userId) {
  const url = paramToQuery(`${WXLOGIN}?code=${code}&userId=${userId}`);
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
        await setData('userNews', data.data);
        return data.data;
      }
    })
    .catch(e => {
      console.log(e.message);
      return Promise.reject(e.message);
    });
}

export function wxUpMoney(userId, cashOutType, cashOutMoney) {
  const url = paramToQuery(
    `${CASHOUT}?userId=${userId}&cashOutType=${cashOutType}&tradeType=2&cashOutMoney=${cashOutMoney}`,
  );
  console.log('url', url);
  return fetch(url, {
    method: 'POST',
  })
    .then(res => {
      console.log(res.status);
      return res.json();
    })
    .then(async data => {
      console.log('enroll', data);
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
