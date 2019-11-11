import {
  FETCH_HALL_REQUEST,
  FETCH_HALL_SUCCESS,
  FETCH_HALL_FAILURE,
} from '../constants/hall';
import * as hallAPI from '../api/hall';

export function fetchHalljob() {
  return dispatch => dispatch({
    type: FETCH_HALL_SUCCESS,
    payload: {
      params: hallAPI.fetchHalljob(),
    },
  });
}