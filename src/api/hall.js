import { paramToQuery, checkStatus, parseJSON, fetchOptions } from '../utils/fetch';

const API = 'hall/job';

export function fetchHalljob(params = {}) {
  const url = paramToQuery(`${API}?pageNo=1&pageSize=10&label=0`);
  return fetch(url, {
    ...fetchOptions(),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

