import {paramToQuery} from '../utils/fetch';
import {
  FETCH_HALL_JOB,
  FETCH_HALL_TYPE,
  FETCH_HALL_JOB_NEXT,
  FETCH_HALL_JOB_DETAIL,
  CLEAR_LIST,
  HALL_SIGN_UP,
} from '../constants/hall';

const JOB = 'hall/job';
const TYPE = 'hall/type';
const DETAIL = 'hall/jobDetails';
const SIGNUP = 'hall/signUp';
const SUBMIT = 'hall/submit';

export const getHallJob = json => {
  return {
    type: FETCH_HALL_JOB,
    json,
  };
};
export const getHallType = json => {
  return {
    type: FETCH_HALL_TYPE,
    json,
  };
};
export const getHallTypeNext = json => {
  return {
    type: FETCH_HALL_JOB_NEXT,
    json,
  };
};
export const getHallDeatil = json => {
  return {
    type: FETCH_HALL_JOB_DETAIL,
    json,
  };
};
export const clearList = json => {
  return {
    type: CLEAR_LIST,
    json,
  };
};
export const signUp = json => {
  return {
    type: HALL_SIGN_UP,
    json,
  };
};

export function fetchHalljob(pageNo, pageSize, labelStatus, typeId) {
  const url = paramToQuery(
    `${JOB}?pageNo=${pageNo}&pageSize=${pageSize}&label=${labelStatus}&typeId=${typeId}`,
  );
  console.log(url);
  return fetch(url)
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log('job', data.status);
      console.log('jobList', data);
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
export function fetchHalljobNext(pageNo, pageSize, labelStatus, typeId) {
  const url = paramToQuery(
    `${JOB}?pageNo=${pageNo}&pageSize=${pageSize}&label=${labelStatus}&typeId=${typeId}`,
  );
  console.log(url);
  return dispatch => {
    return fetch(url)
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log('jobNext', data);
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
  };
}
export function fetchHallType() {
  const url = paramToQuery(`${TYPE}`);
  return fetch(url)
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
      console.log(e.message);
      return Promise.reject(e.message);
    });
}
export function fetchHallDetail(jobId, userId) {
  const url = paramToQuery(`${DETAIL}?jobId=${jobId}&userId=${userId}`);
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
export function fetchHallSignUp(jobId, userId) {
  const url = paramToQuery(`${SIGNUP}?jobId=${jobId}&userId=${userId}`);
  return fetch(url)
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log('signup', data);
      if (data.error) {
        data.msg = '报名';
        return Promise.reject(data);
      } else {
        if (data.status == 0) {
          return Promise.reject(data);
        } else {
          return data;
        }
      }
    })
    .catch(e => {
      console.log(e.msg);
      return Promise.reject(e.msg);
    });
}

export function HallSubmit(data) {
  const url = paramToQuery(`${SUBMIT}`);
  return fetch(url, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-ApiAuth-Token': '',
    },
    body: JSON.stringify(data),
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log('submit', data);
      if (data.error) {
        return Promise.reject(data);
      } else {
        return data;
      }
    })
    .catch(e => {
      console.log(e.msg);
      return Promise.reject(e.msg);
    });
}
