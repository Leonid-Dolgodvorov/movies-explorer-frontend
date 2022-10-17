import React from "react";
import "./SavedMovies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer"

function SavedMovies({isLoggedIn}) {
  return (
    <>
      <Header isLoggedIn={isLoggedIn}/>
      <div className="saved-movies">
        <SearchForm/>
        <MoviesCardList/>
      </div>      
      <Footer/>
      </>
  );
};

export default SavedMovies;