import React from "react";
import "./Movies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer"

function Movies({loggedIn, isBurgerOpened, onBurger, allMovies, savedMovies}) {

  const [isLoading, setIsLoading] = React.useState(false);
  const [newArrMovies, setNewArrMovies] = React.useState([])

  React.useEffect(() => {
    setNewArrMovies(allMovies)
  }, [allMovies]);

  return (
    <>
      <Header
        loggedIn={loggedIn}
        isBurgerOpened={isBurgerOpened}
        onBurger={onBurger}/>
      <div className="movies">
        <SearchForm isLoading={isLoading}/>
        <MoviesCardList
          arrMovies={newArrMovies}
          savedMovies={savedMovies}
          isLoading={isLoading}/>
        <p className="movies__more">Ещё</p>
      </div>      
      <Footer/>
      </>
  );
};

export default Movies;