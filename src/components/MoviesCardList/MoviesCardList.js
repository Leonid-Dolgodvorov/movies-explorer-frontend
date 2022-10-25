import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

const MoviesCardList = ({slicedMoviesArr, savedMovies, isLoading, saveMovie, deleteMovie}) => {

  const isMovieSaved = (movie) => savedMovies.some(savedMovie => savedMovie.movieId === movie.id);

  return (
    <section className="movies__card-list">
      <Preloader isLoading={isLoading}/>
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
