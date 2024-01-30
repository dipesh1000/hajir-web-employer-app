const myHeaders = {
  Accept: 'application/json',
  // Authorization: token,
  // Add other headers as needed
};

export const postRequest = (url, body) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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
