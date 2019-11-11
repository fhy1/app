import * as hallAPI from '../api/hall';

export function fetchHalljob() {
  return dispatch => dispatch(hallAPI.fetchHalljob());
}