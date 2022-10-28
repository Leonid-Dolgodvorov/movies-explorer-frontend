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
  isSearchSavedBtnHandled
}) => {

  const location = useLocation();

  console.log(isSearchSavedBtnHandled)
  console.log(slicedMoviesArr.length)

  const isMovieSaved = (movie) => savedMovies.some(savedMovie => savedMovie.movieId === movie.id);
  return (
    <section className="movies__card-list">
      {location.pathname === "/movies" ?
        <>
          {isSearchBtnHandled && slicedMoviesArr.length ?
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
          :
            <p className="movies__not-found-text">Ничего не найдено movies</p>
          }
        </>
      :
      <>
        {isSearchSavedBtnHandled && slicedMoviesArr.length ?
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
          :
            <p className="movies__not-found-text">Ничего не найдено</p>
          }
      </>
      }
    </section>
  );
};

export default MoviesCardList;