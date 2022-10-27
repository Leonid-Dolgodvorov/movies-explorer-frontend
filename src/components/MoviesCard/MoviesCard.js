import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";

const MoviesCard = ({
  movie,
  isSaved,
  saveMovie,
  deleteMovie,
  savedMovies}) => {

  const location = useLocation();

  const onDeleteMovie = () => {
    const movieToDelete = savedMovies.find((film) => film.movieId === movie.id);
    deleteMovie(movieToDelete._id);
  };

  const onSaveMovie = () => {
    saveMovie(movie);
  }

  const onDeleteOrSaveMovie = () => {
    if (isSaved) {
      onDeleteMovie()
    } else {
      onSaveMovie();
    }
  }

  return (
    <li className="movies__card">
      <div className="movies__text">
        <h2 className="movies__title">{movie.nameRU}</h2>
        <p className="movies__duration">{`${movie.duration} мин.`}</p>
      </div>
      <a 
        className="movies__trailer"
        href={movie.trailerLink}>
        <img
          className="movies__pic"
          src={location.pathname === "/movies" ? 
            `https://api.nomoreparties.co${movie.image.url}`
          :
          movie.image}
          alt={movie.nameRU}/>
      </a>
      <>
        {location.pathname === "/movies" ?
          <button
            type="button"
            className={isSaved ? 
              "movies__button movies__saved-btn" 
              : "movies__button movies__save-btn"}
            onClick={onDeleteOrSaveMovie}/>
          :
          <button
            type="button"
            className={isSaved ? 
              "movies__button delete-btn" 
              : ""}
            onClick={onDeleteOrSaveMovie}/>
        }
      </>
    </li>
  );
};

export default MoviesCard;
