import React from "react";
import "./Movies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader"
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import searchMovies from "../../utils/searchMovies";
import mainApi from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";
import {
  DURATION_SHORT_MOVIE,
  WIDTH_DESKTOP,
  WIDTH_MOBILE,
  MOVIES_LIMIT } from "../../utils/constants";

const Movies = ({
  loggedIn,
  isBurgerOpened,
  onBurger,
  isLoading,
  setIsLoading,
  savedMovies,
  saveMovie,
  deleteMovie,
  isSearchBtnHandled,
  setIsSearchBtnHandled,
  setSavedMovies,
  openErrorPopup,
  errorHandler}) => {

  const [sliceQuantity, setSliceQuantity] = React.useState(0);
  const [isShortBtnActive, setIsShortBtnActive] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [foundMovies, setFoundMovies] = React.useState([]);
  const [slicedMoviesArr, setSlicedMoviesArr] = React.useState([]);

  React.useEffect(() => {
    setSlicedMoviesArr(foundMovies.slice(0, sliceQuantity))
  }, [foundMovies, sliceQuantity]);

  React.useEffect(() => {
    if (localStorage.getItem("foundMovies")) {
      setFoundMovies(JSON.parse(localStorage.getItem("foundMovies")));
    } 
  }, []);

  React.useEffect(() => {
    if (localStorage.isSearchBtnHandled) {
      setIsSearchBtnHandled(JSON.parse(localStorage.getItem("isSearchBtnHandled")));
    };
  }, []);

  React.useEffect(() => {
    if (localStorage.searchQuery) {
      setSearchQuery(localStorage.getItem("searchQuery"));
    };
  }, []);

  React.useEffect(() => {
    if (localStorage.isShortBtnActive) {
      setIsShortBtnActive(Boolean(localStorage.getItem("isShortBtnActive")));
    };
  }, []);

  React.useEffect(() => {
    if (window.innerWidth >= WIDTH_DESKTOP) {
      setSliceQuantity(MOVIES_LIMIT.DESKTOP.COUNT);
    } else if (window.innerWidth > WIDTH_MOBILE && window.innerWidth < WIDTH_DESKTOP) {
      setSliceQuantity(MOVIES_LIMIT.MIDDLE.COUNT);
    } else if (window.innerWidth <= WIDTH_MOBILE) {
      setSliceQuantity(MOVIES_LIMIT.MOBILE.COUNT);
    }
  }, []);

  const onMoreFilms = () => {
    if (window.innerWidth >= WIDTH_DESKTOP) {
      setSliceQuantity(sliceQuantity + MOVIES_LIMIT.DESKTOP.MORE);
    } else {
      setSliceQuantity(sliceQuantity + MOVIES_LIMIT.MIDDLE.MORE);
    }
  };

  const handleShortBtn = () => {
      if (isShortBtnActive === false) {
        localStorage.setItem("isShortBtnActive", true);
      } else {
        localStorage.setItem("isShortBtnActive", "");
      }
    setIsShortBtnActive(!isShortBtnActive);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearchBtnHandled(false);
    setIsLoading(true);
    Promise.all([moviesApi.getMovies()])
        .then(([allMoviesList]) => {
          setIsSearchBtnHandled(true);
          setFoundMovies(searchMovies(allMoviesList, searchQuery));
          localStorage.setItem("foundMovies", 
            JSON.stringify(searchMovies(allMoviesList, searchQuery)));
          localStorage.setItem("isSearchBtnHandled", true);
          localStorage.setItem("searchQuery", searchQuery);
        })
        .catch((err) => openErrorPopup(errorHandler(err)))
        .finally(() => setIsLoading(false));
  };

/*   const handleSearch = (e) => {   
    e.preventDefault();
    setIsLoading(true);
    Promise.all([moviesApi.getMovies(), mainApi.getUserMovies()])
        .then(([allMoviesList, savedMoviesList]) => {
          setIsSearchBtnHandled(true);
          setFoundMovies(searchMovies(allMoviesList, searchQuery));
          setSavedMovies(savedMoviesList)
          localStorage.setItem("foundMovies", 
            JSON.stringify(searchMovies(allMoviesList, searchQuery)));
          localStorage.setItem("isSearchBtnHandled", true);
          localStorage.setItem("searchQuery", searchQuery);
        })
        .catch((err) => openErrorPopup(errorHandler(err)))  
        .finally(() => setIsLoading(false));
  }; */

  const findShortMovies = (movies) =>
    movies.filter((movie) =>
      movie.duration < DURATION_SHORT_MOVIE);

  return (
    <>
      <Header
        loggedIn={loggedIn}
        isBurgerOpened={isBurgerOpened}
        onBurger={onBurger}/>
      <div className="movies">
        <SearchForm
          isShortBtnActive={isShortBtnActive}
          setIsShortBtnActive={setIsShortBtnActive}
          handleShortBtn={handleShortBtn}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          />
        <Preloader isLoading={isLoading}/>
        {isSearchBtnHandled ?
          <>
            <MoviesCardList
              slicedMoviesArr={isShortBtnActive ? 
                findShortMovies(foundMovies) 
                :
                slicedMoviesArr
              }
              savedMovies={savedMovies}
              saveMovie={saveMovie}
              deleteMovie={deleteMovie}
            />
            { slicedMoviesArr.length < foundMovies.length && !isShortBtnActive ? 
              <button
                type="button"
                onClick={onMoreFilms}
                className="movies__more">
                Ещё
              </button>
              :
              <>
              </>
            }
          </>
            : 
            <>
            </>            
        }
      </div>      
      <Footer/>
      </>
  );
};

export default Movies;