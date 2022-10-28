import { IMAGE_BASE_URL, MY_BASE_URL } from "../utils/constants";

class MainApi {
  constructor( { url } ) {
    this._url = url;
  }

  returnResJson(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserMovies() {
    const jwt = localStorage.getItem("jwt");
    return fetch(`${this._url}movies`, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${jwt}`,
      },
    })
    .then(res => this.returnResJson(res))
  }

  getUserInfo() {
    const jwt = localStorage.getItem("jwt");
    return fetch(`${this._url}users/me`, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${jwt}`,
      },
    })
    .then(res => this.returnResJson(res))
  }

  editUserInfo(name, email) {
    const jwt = localStorage.getItem("jwt");
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        name: name,
        email: email,
      })
    })
    .then(res => this.returnResJson(res))
  }

  addCard({nameRU, nameEN, director, country, year, duration, description, trailerLink, url, movieId}) {
    const jwt = localStorage.getItem("jwt");
    return fetch(`${this._url}movies`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        nameRU,
        nameEN,
        director,
        country,
        year,
        duration,
        description,
        trailerLink,
        movieId,
        image: `${IMAGE_BASE_URL}${url}`,
        thumbnail: `${IMAGE_BASE_URL}${url}`,
      })
    })
    .then(res => this.returnResJson(res))
  }

  deleteCard(movieId) {
    const jwt = localStorage.getItem("jwt");
    return fetch(`${this._url}movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${jwt}`,
      },
    })
    .then(res => this.returnResJson(res))
  }
};

const mainApi = new MainApi({
  url: MY_BASE_URL,
});

export default mainApi;