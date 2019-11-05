import {
  FETCH_HOME_REQUEST,
  FETCH_HOME_SUCCESS,
  FETCH_HOME_FAILURE,
} from '../constants/home';
// import * as backupAPI from '../api/backup';

export function fetchBackups(params) {
  return dispatch => dispatch({
    types: [
      FETCH_HOME_REQUEST,
      FETCH_HOME_SUCCESS,
      FETCH_HOME_FAILURE,
    ],
    meta: {
      refresh,
    },
    payload: {
      params
      // promise: backupAPI.fetchBackups(params),
    },
  });
}