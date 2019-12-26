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
const VERSION = 'version';

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
  return fetch(url)
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log(data);
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

export function fetchHomeSignIn(userId) {
  const url = paramToQuery(`${SIGNIN}?userId=${userId}`);
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

export function SignInHome(userId) {
  const url = paramToQuery(`${SIGNIN}?userId=${userId}`);
  return fetch(url, {
    method: 'POST',
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
      return Promise.reject(e.message);
    });
}

export function fetchHomeRecommend(pageNo, pageSize) {
  const url = paramToQuery(
    `${RECOMMEND}?pageNo=${pageNo}&pageSize=${pageSize}`,
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

export function fetchVersion() {
  const url = paramToQuery(`${VERSION}`);
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
