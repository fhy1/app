import {paramToQuery} from '../utils/fetch';
import {
  SUBMIT_OPTION,
  FETCH_OPTION_LIST,
  CLEAR_OPTION_LIST,
} from '../constants/option';

const OPTION = 'opinion';
const OPTIONALL = 'opinion/all';

export const getOption = json => {
  return {
    type: FETCH_OPTION_LIST,
    json,
  };
};
export const addOption = json => {
  return {
    type: SUBMIT_OPTION,
    json,
  };
};
export const clearOption = () => {
  return {
    type: CLEAR_OPTION_LIST,
  };
};
export function fetchOptionAll(pageNo, pageSize) {
  const url = paramToQuery(
    `${OPTIONALL}?pageNo=${pageNo}&pageSize=${pageSize}`,
  );
  console.log('url', url);
  return fetch(url)
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log('option', data.status);
      console.log('option', data);
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

export function addOneOptions(userId, opinion) {
  const url = paramToQuery(`${OPTION}?userId=${userId}&opinion=${opinion}`);

  return fetch(url, {
    method: 'POST',
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
      console.log('err1', e.message);
      return Promise.reject(e.message);
    });
}
