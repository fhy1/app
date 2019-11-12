
let apiUrl = 'http://111.231.50.113:9099/'

export function parseJSON(response) {
  console.log('hehe:', response)
  console.log('hehe:', response.json())
  return response.json();
}

export function checkStatus(response) {
  if (!response.ok) {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }

  return response;
}

export function paramToQuery(url, params) {
  return `${apiUrl}${url}`;
}

export function fetchOptions(headers = {}) {
  return {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-ApiAuth-Token': '',
      ...headers,
    },
    credentials: 'same-origin',
  };
}