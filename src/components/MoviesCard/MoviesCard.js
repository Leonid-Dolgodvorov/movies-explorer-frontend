import React from "react";
import "./MoviesCard.css";
import moviePic from "../../images/movie.jpg"

const isSavedFilms = true;

function MoviesCard() {
  return (
    <li className="movies__card">
      <div className="movies__text">
        <h2 className="movies__title">В погоне за Бенкси</h2>
        <p className="movies__duration">27 минут</p>
      </div>
      <img className="movies__pic" src={moviePic} alt="обложка фильма"/>      
      <>
        {isSavedFilms ?
          <button type="button" className="movies__button movies__saved-btn"></button>
          :
          <button type="button" className="movies__button movies__save-btn"></button>
        }
      </>
    </li>
  );
};

export default MoviesCard;