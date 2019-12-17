import {paramToQuery} from '../utils/fetch';
import {
  FETCH_USER_CODE,
  FETCH_USER_CHECKCODE,
  FETCH_USER_LOGIN,
} from '../constants/login';
import {setData} from '../utils/storage';

const CODE = 'user/code';
const CHECKCODE = 'user/checkCode';
const ENROLL = 'user/enroll';
const WXLOGIN = 'user/weChatLogin';
const WXINFO = 'user/wxInfo';
const ISPHONE = 'user/isExistPhone';
const REGISTER = 'user/register';
const BindWx = 'user/bindWx';

export const getCode = json => {
  return {
    type: FETCH_USER_CODE,
    json,
  };
};
export const getCheckCode = json => {
  return {
    type: FETCH_USER_CHECKCODE,
    json,
  };
};
export const getLogin = json => {
  return {
    type: FETCH_USER_LOGIN,
    json,
  };
};

export function fetchUserCode(phone) {
  const url = paramToQuery(`${CODE}?phone=${phone}`);
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

export function fetchCheckCode(data) {
  const url = paramToQuery(
    `${CHECKCODE}?phone=${data.phone}&code=${data.code}`,
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

export function fetchCheckEnroll(data) {
  const url = paramToQuery(
    `${ENROLL}?phone=${data.phone}&password=${data.code}`,
  );
  return fetch(url)
    .then(res => {
      return res.json();
    })
    .then(async data => {
      if (data.error) {
        return Promise.reject(data);
      } else {
        await setData('userNews', data.data);
        return data.data;
      }
    })
    .catch(e => {
      return Promise.reject(e.message ? e.message : e.msg);
    });
}

export function wxLogin(code) {
  const url = paramToQuery(`${WXLOGIN}?code=${code}`);
  return fetch(url)
    .then(res => {
      return res.json();
    })
    .then(async data => {
      if (data.error) {
        return Promise.reject(data);
      } else {
        await setData('userNews', data.data);
        return data.data;
      }
    })
    .catch(e => {
      return Promise.reject(e.message);
    });
}

export function wxGetWxInfo(code) {
  const url = paramToQuery(`${WXINFO}?code=${code}`);
  return fetch(url)
    .then(res => {
      return res.json();
    })
    .then(async data => {
      if (data.error) {
        return Promise.reject(data);
      } else {
        return data.data;
      }
    })
    .catch(e => {
      return Promise.reject(e.message);
    });
}
export function fetchIsPhone(phone) {
  const url = paramToQuery(`${ISPHONE}?phone=${phone}`);
  return fetch(url)
    .then(res => {
      return res.json();
    })
    .then(async data => {
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

export function register(data) {
  const url = paramToQuery(
    `${REGISTER}?phone=${data.phone}&password=${data.password}&openid=${data.openid}&nickname=${data.nickname}&sex=${data.sex}&headimgurl=${data.headimgurl}&upUID=${data.upUID}&country=${data.country}&city=${data.city}&province=${data.province}`,
  );
  return fetch(url, {
    method: 'post',
  })
    .then(res => {
      return res.json();
    })
    .then(async data => {
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

export function bindWxLogin(data) {
  const url = paramToQuery(
    `${BindWx}?phone=${data.phone}&password=${data.password}&openid=${data.openid}&nickname=${data.nickname}&sex=${data.sex}&headimgurl=${data.headimgurl}&upUID=${data.upUID}&country=${data.country}&city=${data.city}&province=${data.province}`,
  );
  return fetch(url, {
    method: 'post',
  })
    .then(res => {
      return res.json();
    })
    .then(async data => {
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
