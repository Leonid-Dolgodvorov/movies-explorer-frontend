import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

function MoviesCardList({slicedMoviesArr, savedMovies, isLoading}) {

  return (
    <section className="movies__card-list">
      <Preloader isLoading={isLoading}/>
      <ul className="movies__cards">
        {slicedMoviesArr.map((movie) => {
            return (
            <MoviesCard
              key={movie.id}
              movie={movie}/>)}
        )}
      </ul>
    </section>
  );
};

export default MoviesCardList;
