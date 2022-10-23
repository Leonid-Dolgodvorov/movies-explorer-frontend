import React from "react";
import "./SavedMovies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer"

function SavedMovies({loggedIn, isBurgerOpened, onBurger, allMovies, savedMovies}) {
  return (
    <>
      <Header
        loggedIn={loggedIn}
        isBurgerOpened={isBurgerOpened}
        onBurger={onBurger}/>
      <div className="saved-movies">
        <SearchForm/>
        <MoviesCardList
          allMovies={allMovies}
          savedMovies={savedMovies}/>
      </div>      
      <Footer/>
      </>
  );
};

export default SavedMovies;