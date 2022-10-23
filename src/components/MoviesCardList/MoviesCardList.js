import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

function MoviesCardList({arrMovies, savedMovies, isLoading}) {

  const [sliceQuantity, setSliceQuantity] = React.useState(0);
  const slicedMoviesArr = arrMovies.slice(0, sliceQuantity);

  React.useEffect(() => {
    if (window.innerWidth >= 1280) {
      setSliceQuantity(8);
    } else if (window.innerWidth > 480 && window.innerWidth < 1280) {
      setSliceQuantity(5);
    } else if (window.innerWidth <= 480) {
      setSliceQuantity(2);
    }
  }, [window.innerWidth]);

  return (
    <section className="movies__card-list">
      <Preloader isLoading={isLoading}/>
      <ul className="movies__cards">
        {slicedMoviesArr.map((movie) => { 
          console.log(slicedMoviesArr)
          console.log(window.innerWidth)
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
