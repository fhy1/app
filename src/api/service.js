import {paramToQuery} from '../utils/fetch';

const CUSTOMER = 'user/customer';

export function fetchCustomer() {
  const url = paramToQuery(`${CUSTOMER}`);

  return fetch(url)
    .then(res => {
      return res.json();
    })
    .then(data => {
      if (data.error) {
        return Promise.reject(data);
      } else {
        console.log(data);
        return data;
      }
    })
    .catch(e => {
      console.log('err1', e.message);
      return Promise.reject(e.message);
    });
}
