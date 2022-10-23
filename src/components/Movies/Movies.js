import React from "react";
import "./Movies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer"

function Movies({loggedIn, isBurgerOpened, onBurger}) {
  return (
    <>
      <Header
        loggedIn={loggedIn}
        isBurgerOpened={isBurgerOpened}
        onBurger={onBurger}/>
      <div className="movies">
        <SearchForm/>
        <MoviesCardList/>
        <p className="movies__more">Ещё</p>
      </div>      
      <Footer/>
      </>
  );
};

export default Movies;