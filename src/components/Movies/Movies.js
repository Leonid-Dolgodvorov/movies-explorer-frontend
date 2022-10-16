import React from "react";
import "./Movies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer"

function Movies() {
  return (
    <>
      <Header/>
      <div className="movies">
        <SearchForm/>
        <MoviesCardList/>
      </div>
      <Footer/>
      </>
  );
};

export default Movies;