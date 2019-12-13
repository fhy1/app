import {paramToQuery} from '../utils/fetch';

const REPORT = 'report';
const REPORTUSER = 'report/user/all';
const REPORTUSERAUDIT = 'report/user/audit';
const REPORTREWARD = 'report/reward/all';
const REPORTREWARDAUDIT = 'report/reward/audit';
const REPORTREREPLY = 'report/reply';
const REPORTEND = 'report/end';
const REPORTCOMMIT = 'report/commit';

export function report(userId, taskId, reportReason, reportImg) {
  const url = paramToQuery(
    `${REPORT}?userId=${userId}&taskId=${taskId}&reportReason=${reportReason}&reportImg=${reportImg}`,
  );
  console.log(url);
  return fetch(url, {
    method: 'post',
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
      console.log('err1', e);
      return Promise.reject(e.message);
    });
}

export function fetchUserReport(userId, reportStatus, pageNo, pageSize) {
  const url = paramToQuery(
    `${REPORTUSER}?userId=${userId}&reportStatus=${reportStatus}&pageNo=${pageNo}&pageSize=${pageSize}`,
  );
  console.log(url);
  return fetch(url, {
    method: 'get',
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      if (data.error) {
        return Promise.reject(data);
      } else {
        console.log(data);
        return data;
      }
    })
    .catch(e => {
      console.log('err1', e);
      return Promise.reject(e.message);
    });
}

export function fetchUserReportAudit(userId, pageNo, pageSize) {
  const url = paramToQuery(
    `${REPORTUSERAUDIT}?userId=${userId}&pageNo=${pageNo}&pageSize=${pageSize}`,
  );
  console.log(url);
  return fetch(url, {
    method: 'get',
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      if (data.error) {
        return Promise.reject(data);
      } else {
        console.log(data);
        return data;
      }
    })
    .catch(e => {
      console.log('err1', e);
      return Promise.reject(e.message);
    });
}

export function fetchReward(userId, reportStatus, pageNo, pageSize) {
  const url = paramToQuery(
    `${REPORTREWARD}?userId=${userId}&reportStatus=${reportStatus}&pageNo=${pageNo}&pageSize=${pageSize}`,
  );
  console.log(url);
  return fetch(url, {
    method: 'get',
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      if (data.error) {
        return Promise.reject(data);
      } else {
        console.log(data);
        return data;
      }
    })
    .catch(e => {
      console.log('err1', e);
      return Promise.reject(e.message);
    });
}

export function fetchRewardAudit(userId, pageNo, pageSize) {
  const url = paramToQuery(
    `${REPORTREWARDAUDIT}?userId=${userId}&pageNo=${pageNo}&pageSize=${pageSize}`,
  );
  console.log(url);
  return fetch(url, {
    method: 'get',
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      if (data.error) {
        return Promise.reject(data);
      } else {
        console.log(data);
        return data;
      }
    })
    .catch(e => {
      console.log('err1', e);
      return Promise.reject(e.message);
    });
}

export function rewardReply(reportId, replyReason, replyImg) {
  const url = paramToQuery(
    `${REPORTREREPLY}?reportId=${reportId}&replyReason=${replyReason}&replyImg=${replyImg}`,
  );
  console.log(url);
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
        console.log(data);
        return data;
      }
    })
    .catch(e => {
      console.log('err1', e);
      return Promise.reject(e.message);
    });
}

export function rewportEnd(reportId) {
  const url = paramToQuery(`${REPORTEND}?reportId=${reportId}`);
  console.log(url);
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
        console.log(data);
        return data;
      }
    })
    .catch(e => {
      console.log('err1', e);
      return Promise.reject(e.message);
    });
}

export function rewportCommit(reportId, refuteReason) {
  const url = paramToQuery(
    `${REPORTCOMMIT}?reportId=${reportId}&refuteReason=${refuteReason}`,
  );
  console.log(url);
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
        console.log(data);
        return data;
      }
    })
    .catch(e => {
      console.log('err1', e);
      return Promise.reject(e.message);
    });
}
