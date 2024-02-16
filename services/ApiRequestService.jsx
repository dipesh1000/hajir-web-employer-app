const myHeaders = {
  Accept: "application/json",
  // Authorization: token,
};

export const getToken = () => {
  let token = JSON.parse(localStorage.getItem("token"));
  if (token) {
    return `Bearer ${token}`;
  } else {
    return null;
  }
};

export const postRequest = (url, body) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken(),
    },
    body: JSON.stringify(body),
  });
};

export const getRequest = (url, params) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken(),
    },
  });
};
