import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

const MoviesCardList = ({slicedMoviesArr, localSavedMovies, isLoading, saveMovie, deleteMovie}) => {

  const isMovieSaved = (movie) => {
    if (localSavedMovies) {
      return localSavedMovies.some(savedMovie => savedMovie.movieId === movie.id)
    }
    else {return false}
  };

  return (
    <section className="movies__card-list">
      <Preloader isLoading={isLoading}/>
      <ul className="movies__cards">
        {slicedMoviesArr.map((movie) => {
            return (
            <MoviesCard
              key={movie.id}
              isSaved={isMovieSaved(movie)}
              saveMovie={saveMovie}
              deleteMovie={deleteMovie}
              movie={movie}/>)}
        )}
      </ul>
    </section>
  );
};

export default MoviesCardList;
