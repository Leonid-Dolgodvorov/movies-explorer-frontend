import React from "react";
import "./SavedMovies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader"
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import searchMovies from "../../utils/searchMovies";
import mainApi from "../../utils/MainApi";
import {
  DURATION_SHORT_MOVIE,
  WIDTH_DESKTOP,
  WIDTH_MOBILE,
  MOVIES_LIMIT } from "../../utils/constants";

const SavedMovies = ({
  loggedIn,
  isBurgerOpened,
  onBurger,
  isLoading,
  setIsLoading,
  isSearchSavedBtnHandled,
  setIsSearchSavedBtnHandled,
  savedMovies,
  setSavedMovies,
  openErrorPopup,
  errorHandler}) => {

  const [sliceQuantity, setSliceQuantity] = React.useState(0);
  const [isShortBtnActive, setIsShortBtnActive] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [foundSavedMovies, setFoundSavedMovies] = React.useState([]);
  const [slicedMoviesArr, setSlicedMoviesArr] = React.useState([]);

  React.useEffect(() => {
    setSlicedMoviesArr(foundSavedMovies.slice(0, sliceQuantity));
    console.log(foundSavedMovies)
  }, [foundSavedMovies, sliceQuantity]);

  React.useEffect(() => {
      setIsLoading(true);
      Promise.all([mainApi.getUserMovies()])
        .then(([savedMoviesList]) => {
          setSavedMovies(savedMoviesList.data);
          setFoundSavedMovies(savedMoviesList.data);
        })
        .catch((err) => openErrorPopup(errorHandler(err)))
        .finally(() => setIsLoading(false))
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
    setIsLoading(true);
    Promise.all([mainApi.getUserMovies()])
      .then(([savedMoviesList]) => {
        setFoundSavedMovies(searchMovies(savedMoviesList.data, searchQuery));        
      })
      .catch((err) => openErrorPopup(errorHandler(err)))
      .finally(() => {
        setIsLoading(false);
        setIsSearchSavedBtnHandled(true);
      });
  };

  const findShortMovies = (movies) =>
    movies.filter((movie) =>
      movie.duration < DURATION_SHORT_MOVIE);

  const deleteSavedMovie = (movieId) => {
    mainApi.deleteCard(movieId)
      .then(() => mainApi.getUserMovies())
      .then((savedMoviesList) => {
        setSavedMovies(savedMoviesList.data);
        setFoundSavedMovies(searchMovies(savedMoviesList.data, searchQuery));
      })
      .catch((err) => openErrorPopup(errorHandler(err)))
      .finally(() => setIsLoading(false))
  };

  return (
    <>
      <Header
        loggedIn={loggedIn}
        isBurgerOpened={isBurgerOpened}
        onBurger={onBurger}/>
      <div className="saved-movies">
        <SearchForm
          isShortBtnActive={isShortBtnActive}
          setIsShortBtnActive={setIsShortBtnActive}
          handleShortBtn={handleShortBtn}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          />
        <Preloader isLoading={isLoading}/>
        <MoviesCardList
              slicedMoviesArr={isShortBtnActive ? 
                findShortMovies(foundSavedMovies)
                :
                slicedMoviesArr
              }
              savedMovies={savedMovies}
              deleteMovie={deleteSavedMovie}
              isSearchSavedBtnHandled={isSearchSavedBtnHandled}
            />
      </div>      
      <Footer/>
      </>
  );
};

export default SavedMovies;