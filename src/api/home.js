import {paramToQuery} from '../utils/fetch';
import {
  FETCH_HOME_IMG,
  FETCH_HOME_SIGNIN,
  HOME_SIGNIN,
  HOME_SIGNIN_RECOMMEND,
} from '../constants/home';

const IMG = 'home/img';
const SIGNIN = 'home/sign_in';
const RECOMMEND = 'home/recommend';

export const getHomeImg = json => {
  return {
    type: FETCH_HOME_IMG,
    json,
  };
};

export const getHomeSignIn = json => {
  return {
    type: FETCH_HOME_SIGNIN,
    json,
  };
};

export const postSignIn = json => {
  return {
    type: HOME_SIGNIN,
    json,
  };
};

export const getHomeRecommend = json => {
  return {
    type: HOME_SIGNIN_RECOMMEND,
    json,
  };
};

export function fetchHomeImg() {
  const url = paramToQuery(`${IMG}`);
  return dispatch => {
    return fetch(url)
      .then(res => {
        console.log(res.status);
        return res.json();
      })
      .then(data => {
        console.log('img', data);
        if (data.error) {
          return Promise.reject(data);
        } else {
          dispatch(getHomeImg(data));
        }
      })
      .catch(e => {
        console.log(e.message);
        return Promise.reject(e.message);
      });
  };
}

export function fetchHomeSignIn(userId) {
  const url = paramToQuery(`${SIGNIN}?userId=${userId}`);
  return dispatch => {
    return fetch(url)
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log('sign', data);
        if (data.error) {
          return Promise.reject(data);
        } else {
          dispatch(getHomeSignIn(data));
        }
      })
      .catch(e => {
        console.log(e.message);
        return Promise.reject(e.message);
      });
  };
}

export function SignInHome(userId) {
  const url = paramToQuery(`${SIGNIN}?userId=${userId}`);
  return dispatch => {
    return fetch(url, {
      method: 'POST',
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log('img', data);
        if (data.error) {
          return Promise.reject(data);
        } else {
          dispatch(getHomeImg(data));
        }
      })
      .catch(e => {
        console.log(e.message);
        return Promise.reject(e.message);
      });
  };
}

export function fetchHomeRecommend(pageNo, pageSize) {
  const url = paramToQuery(
    `${RECOMMEND}?pageNo=${pageNo}&pageSize=${pageSize}`,
  );
  console.log('url', url);
  return dispatch => {
    return fetch(url)
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log('recommend', data);
        if (data.error) {
          return Promise.reject(data);
        } else {
          dispatch(getHomeRecommend(data));
        }
      })
      .catch(e => {
        console.log(e.message);
        return Promise.reject(e.message);
      });
  };
}
