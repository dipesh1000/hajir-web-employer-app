const myHeaders = {
  Accept: 'application/json',
  // Authorization: token,
};

const getToken = () => {
  let token = JSON.parse(localStorage.getItem('token'));
  if (token) {
    return `Bearer ${token}`;
  } else {
    return null;
  }
};

export const postRequest = (url, body) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getToken(),
    },
    body: JSON.stringify(body),
  });
};

const getRequest = (url, params) => {
  return fetchClient(url, {
    method: 'GET',
    params: { ...params },
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: myHeaders,
  });
};
