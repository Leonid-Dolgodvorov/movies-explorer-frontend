const searchMovies = (movies, searchQuery) => {

  const findMovies = (movie, keyword) => movie.nameRU.toLowerCase().includes(keyword.toLowerCase()) || movie.nameEN.toLowerCase().includes(keyword.toLowerCase());
  return movies.filter(movie => findMovies(movie, searchQuery));
}

export default searchMovies;