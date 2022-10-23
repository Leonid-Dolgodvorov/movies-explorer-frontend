import React from "react";
import "./MoviesCard.css";

function MoviesCard({movie, isSavedFilm}) {
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
          src={`https://api.nomoreparties.co${movie.image.url}`}
          alt={movie.nameRU}/>
      </a>
      <>
        {isSavedFilm ?
          <button type="button" className="movies__button movies__saved-btn"></button>
          :
          <button type="button" className="movies__button movies__save-btn"></button>
        }
      </>
    </li>
  );
};

export default MoviesCard;