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
const JOBREFESH = 'job/refreshJob';

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

export function fetchHalljob(
  pageNo,
  pageSize,
  labelStatus,
  typeId,
  keyWord = '',
) {
  const url = paramToQuery(
    `${JOB}?pageNo=${pageNo}&pageSize=${pageSize}&label=${labelStatus}&typeId=${typeId}&keyWord=${keyWord}`,
  );
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
      return Promise.reject(e.message);
    });
}
export function fetchHalljobNext(pageNo, pageSize, labelStatus, typeId) {
  const url = paramToQuery(
    `${JOB}?pageNo=${pageNo}&pageSize=${pageSize}&label=${labelStatus}&typeId=${typeId}`,
  );
  return dispatch => {
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
      return Promise.reject(e.message);
    });
}
export function fetchHallSignUp(jobId, userId) {
  const url = paramToQuery(`${SIGNUP}?jobId=${jobId}&userId=${userId}`);
  return fetch(url)
    .then(res => {
      return res.json();
    })
    .then(data => {
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
      if (data.error) {
        return Promise.reject(data);
      } else {
        return data;
      }
    })
    .catch(e => {
      return Promise.reject(e.msg);
    });
}

export function refeshJob(jobId) {
  const url = paramToQuery(`${JOBREFESH}?jobId=${jobId}`);
  return fetch(url, {
    method: 'put',
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
      return Promise.reject(e.msg);
    });
}
