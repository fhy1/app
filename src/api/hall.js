import {paramToQuery} from '../utils/fetch';
import {FETCH_HALL_SUCCESS} from '../constants/hall';

const API = 'hall/job';

export const getSuccess = json => {
  return {
    type: FETCH_HALL_SUCCESS,
    json,
  };
};

export function fetchHalljob(params = {}) {
  const url = paramToQuery(`${API}?pageNo=1&pageSize=10&label=0`);
  return dispatch => {
    return fetch(url)
      .then(res => {
        console.log(res.status);
        return res.json();
      })
      .then(data => {
        dispatch(getSuccess(data));
      })
      .catch(e => {
        console.log(e.message);
      });
  };
}
