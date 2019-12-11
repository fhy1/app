import {paramToQuery} from '../utils/fetch';

const CHART = 'chat';
const RECORD = 'chat/record';

export function fetchChart(data) {
  const url = paramToQuery(
    `${CHART}?userId=${data.userId}&pageNo=${data.pageNo}&pageSize=${data.pageSize}`,
  );
  console.log(url);
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
      console.log('err1', e.message);
      return Promise.reject(e.message);
    });
}

export function fetchChartRecord(data) {
  const url = paramToQuery(
    `${RECORD}?userId=${data.userId}&targetId=${data.targetId}&pageNo=${data.pageNo}&pageSize=${data.pageSize}`,
  );
  console.log(url);
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
      console.log('err1', e.message);
      return Promise.reject(e.message);
    });
}

export function addChart(data) {
  const url = paramToQuery(
    `${RECORD}?userId=${data.userId}&targetId=${data.targetId}&newsContent=${data.newsContent}`,
  );
  console.log(url);
  return fetch(url, {
    method: 'post',
  })
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
      console.log('err1', e.message);
      return Promise.reject(e.message);
    });
}
