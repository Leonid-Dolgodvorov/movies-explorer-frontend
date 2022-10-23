class MainApi {
  constructor( { url, headers } ) {
    this._url = url;
    this._headers = headers;
  }

  returnResJson(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserMovies() {
    return fetch(`${this._url}movies`, {
      headers: this._headers,
    })
    .then(res => this.returnResJson(res))
  }

  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      headers: this._headers,
    })
    .then(res => this.returnResJson(res))
  }

  editUserInfo(name, email) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        email: email,
      })
    })
    .then(res => this.returnResJson(res))
  }

  addCard({nameRU, nameEN, director, country, year, duration, description, trailerLink, image}) {
    return fetch(`${this._url}movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        nameRU,
        nameEN,
        director,
        country,
        year,
        duration,
        description,
        trailerLink,
        image: `https://api.nomoreparties.co${image.url}`,
      })
    })
    .then(res => this.returnResJson(res))
  }

  deleteCard(movieId) {
    return fetch(`${this._url}movies/${movieId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(res => this.returnResJson(res))
  }
};

const jwt = localStorage.getItem("jwt");

const mainApi = new MainApi({
  url: "https://api.dolgodvorovl.nomoredomains.icu/",
  headers: {
    "Content-Type": "application/json",
    'Authorization': `Bearer ${jwt}`,
  },
});

export default mainApi;