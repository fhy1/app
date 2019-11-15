import {paramToQuery} from '../utils/fetch';
import {FETCH_EXTEND_INVITE} from '../constants/extend';

const INVITE = 'extend/invite';

export const getInvite = json => {
  return {
    type: FETCH_EXTEND_INVITE,
    json,
  };
};

export function fetchExtendInvite() {
  const url = paramToQuery(`${INVITE}`);
  console.log('url', url);
  return dispatch => {
    return fetch(url)
      .then(res => {
        console.log(res.status);
        return res.json();
      })
      .then(data => {
        console.log('data', data);
        dispatch(getInvite(data));
      })
      .catch(e => {
        console.log(e.message);
      });
  };
}
