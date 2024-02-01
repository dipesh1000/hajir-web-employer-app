const token =
  "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNDVmMGVkODAxNzAwNjBjNWYyZTBmOWI0NDkwYWU2Njg0NTIzYzczZThkNjliMDg4ZGMwNzc3Zjc4MzQwN2NhZDQ0MDUxMjA3N2EyMGIzNWUiLCJpYXQiOjE3MDY0MTQ0MDkuMDY2NzgsIm5iZiI6MTcwNjQxNDQwOS4wNjY3ODYsImV4cCI6MTczODAzNjgwOS4wNjQ3NzEsInN1YiI6IjIiLCJzY29wZXMiOltdfQ.f3PwHyWvQN0KJJpwquATJwn4LkGOl30Z5UBvCy0Zn4qooWJjIEiDCBIDNApwUO6eURuHd8v3FV7h8zQONPFEmjDiRW100kyNMC2KadS2YMr4-RLK3Tp3lG94XFzY3nq0v3ISvgBMvzmh2h0KOWo5VmVN4nHkU75nzTDBRzS4PH_08KLA_VXiSy3OBNx3OxDxiSMh1sNCshc0FHeBqrx_r5wIvg0q7TAim064fmOgPQBP1jlbL36aSQSCl3YqKxxR0ra4Udr5oMioo7pfKYgGte_QHXZ-HHYT_7LeYTi9jddWr3mPo1qfmZ_etRFi3t7NhahRFs2p6h-oeawqHIeajHU__k0iQwTcfrMdD2Xs09u9XE9MQaeBSjRO17oKJhm5E3-i7ZklpF2KGFYvdBnG56j3LuFPjhUNf5TbIGvIl-rCgWUb-_KrRpIFqnbWYXipYKIq_Dq54eZrJ0GyzcXU1oz6YD_T1FVgBHmM5quV5ScgCBtFzahL6sdugellBvTDHQyRwEEToKaii_f0h1q9DYxgklgEVqd29p07oClKFlLHLzYw1G4LtL3rJ_oirYstQnv3AjilT8dj2iEf6NnYqwvIPL_RpjD8LQIEbAqBv57dN5ftnqFfHKMGu5T9P2USu2uS7UPYDfGDWmsdWtt6_tFu2OiAGRcUkh0ZwH6WWnY";

const myHeaders = {
  Accept: "application/json",
  Authorization: token,
};

// services/api.js

export const postRequest = async (url, body, token) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: token,
    },
    body: body,
  });
};

const getRequest = (url, params) => {
  return fetchClient(url, {
    method: "GET",
    params: { ...params },
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    headers: myHeaders,
  });
};
