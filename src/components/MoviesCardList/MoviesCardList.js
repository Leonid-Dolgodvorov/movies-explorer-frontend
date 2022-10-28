import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

const MoviesCardList = ({
  slicedMoviesArr,
  savedMovies,
  saveMovie,
  deleteMovie,
  isSearchBtnHandled,
}) => {

  const location = useLocation();

  const isMovieSaved = (movie) => savedMovies.some(savedMovie => savedMovie.movieId === movie.id);
  return (
    <section className="movies__card-list">
<ul className="movies__cards">
          {slicedMoviesArr.map((movie) => {
              return (
              <MoviesCard
                key={movie.id || movie._id}
                isSaved={isMovieSaved(movie)}
                savedMovies={savedMovies}
                saveMovie={saveMovie}
                deleteMovie={deleteMovie}
                movie={movie}/>)}
          )}
      </ul>
    </section>
  );
};

export default MoviesCardList;