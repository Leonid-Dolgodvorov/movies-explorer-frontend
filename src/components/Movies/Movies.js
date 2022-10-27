import React from "react";
import "./Movies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import { DURATION_SHORT_MOVIE, WIDTH_DESKTOP, WIDTH_MOBILE, MOVIES_LIMIT } from "../../utils/constants";

const Movies = ({
  loggedIn,
  isBurgerOpened,
  onBurger,
  isLoading,
  setIsLoading,
  allMovies,
  savedMovies,
  saveMovie,
  deleteMovie,
  isSearchBtnHandled,
  setIsSearchBtnHandled}) => {

  const [sliceQuantity, setSliceQuantity] = React.useState(0);
  const [isShortBtnActive, setIsShortBtnActive] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [slicedMoviesArr, setSlicedMoviesArr] = React.useState([]);
  
/*   const localMovies = localStorage.getItem("localMovies");
  const localSavedMovies = localStorage.getItem("localSavedMovies"); */

/*   React.useEffect(() => {
    if (localMovies) {
      setSlicedMoviesArr((JSON.parse(localMovies).slice(0, sliceQuantity)));
    }
  }, [localMovies, sliceQuantity]); */

  React.useEffect(() => {
    if (localStorage.getItem("foundMovies" && localStorage.getItem("SearchBtnHandled") === true)) {
      setSlicedMoviesArr(JSON.parse(localStorage.getItem("foundMovies")).slice(0, sliceQuantity))
    } 
    else {
      setSlicedMoviesArr(allMovies.slice(0, sliceQuantity))
    }
  }, [allMovies, sliceQuantity]);

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
    setIsShortBtnActive(!isShortBtnActive);
  };

  const handleSearch = (e) => {   
    e.preventDefault();
    const findMovies = (movie, keyword) => movie.nameRU.toLowerCase().includes(keyword.toLowerCase()) || movie.nameEN.toLowerCase().includes(keyword.toLowerCase());
    setSlicedMoviesArr(slicedMoviesArr.filter(movie => findMovies(movie, inputValue)));
    localStorage.setItem("foundMovies", JSON.stringify(slicedMoviesArr.filter(movie => findMovies(movie, inputValue))));
    setIsSearchBtnHandled(true);
    localStorage.setItem("SearchBtnHandled", true)
  };

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
          setInputValue={setInputValue}
          handleSearch={handleSearch}
          />
        {isSearchBtnHandled ?
          <>
            <MoviesCardList
              slicedMoviesArr={isShortBtnActive ? 
                findShortMovies(slicedMoviesArr) 
                :
                slicedMoviesArr
              }
              savedMovies={savedMovies}
              saveMovie={saveMovie}
              deleteMovie={deleteMovie}
              isLoading={isLoading}
            />
            <button
              type="button"
              onClick={onMoreFilms}
              className="movies__more">
              Ещё
            </button>
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