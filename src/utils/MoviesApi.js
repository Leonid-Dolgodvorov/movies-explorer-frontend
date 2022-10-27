import { BEATFILM_BASE_URL } from "../utils/constants";

class MoviesApi {
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

  getMovies() {
    return fetch(this._url, {
      headers: this._headers,
    })
      .then(res => this.returnResJson(res))
  }
};
  
const moviesApi = new MoviesApi({
  url: BEATFILM_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default moviesApi;