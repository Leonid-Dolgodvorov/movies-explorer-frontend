import { MY_BASE_URL } from "../utils/constants";

function returnResJson(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const register = (name, email, password) => {
  return fetch(`${MY_BASE_URL}signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  })
    .then(returnResJson)
};

export const authorize = (email, password) => {
  return fetch(`${MY_BASE_URL}signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then(returnResJson)
    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        return data;
      } else {
        return;
      }
     }) 
};

export const getData = (token) => {
  return fetch(`${MY_BASE_URL}users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(returnResJson)
};
