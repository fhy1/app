import {paramToQuery} from '../utils/fetch';

const audit = 'job/audit';

export function fetchHalljob() {
  const url = paramToQuery(`${audit}?pageNo=${1}&pageSize=${10}&userId=${7}`);
  console.log(url);
  return fetch(url)
    .then(res => {
      return res.json();
    })
    .then(data => {
      return data;
    })
    .catch(e => {
      console.log(e.message);
    });
}
