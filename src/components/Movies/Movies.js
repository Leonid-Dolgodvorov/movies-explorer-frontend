import React from "react";
import "./Movies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer"

function Movies({loggedIn, isBurgerOpened, onBurger, isLoading, setIsLoading}) {

  const [sliceQuantity, setSliceQuantity] = React.useState(0);
  const [isShortBtnActive, setIsShortBtnActive] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [slicedMoviesArr, setSlicedMoviesArr] = React.useState([]);
  
  const localMovies = localStorage.getItem("localMovies");
  const localSavedMovies = localStorage.getItem("localSavedMovies");

  React.useEffect(() => {
    if (localMovies) {
      setSlicedMoviesArr((JSON.parse(localMovies).slice(0, sliceQuantity)));
    }
  }, [localMovies, sliceQuantity]);

  React.useEffect(() => {
    if (window.innerWidth >= 1280) {
      setSliceQuantity(8);
    } else if (window.innerWidth > 480 && window.innerWidth < 1280) {
      setSliceQuantity(5);
    } else if (window.innerWidth <= 480) {
      setSliceQuantity(2);
    }
  }, [window.innerWidth]);

  const onMoreFilms = () => {
    if (window.innerWidth >= 1280) {
      setSliceQuantity(sliceQuantity + 3);
    } else {
      setSliceQuantity(sliceQuantity + 2);
    }
  };

  const handleShortBtn = () => {
    setIsShortBtnActive(!isShortBtnActive);
  };

  const handleFind = (e) => {   
    e.preventDefault();
    const findMovies = (movie, keyword) => movie.nameRU.toLowerCase().includes(keyword.toLowerCase()) || movie.nameEN.toLowerCase().includes(keyword.toLowerCase());
    setSlicedMoviesArr(slicedMoviesArr.filter(movie => findMovies(movie, inputValue)));
  };

  const findShortMovies = (movies) =>
    movies.filter((movie) => 
      movie.duration < 40);

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
          handleFind={handleFind}
          />
        <MoviesCardList
          slicedMoviesArr={isShortBtnActive ? 
            findShortMovies(JSON.parse(localMovies)) 
            :
            slicedMoviesArr
          }
          localSavedMovies={JSON.parse(localSavedMovies)}
          isLoading={isLoading}/>
          <button
            type="button"
            onClick={onMoreFilms}
            className="movies__more">
            Ещё
          </button>
      </div>      
      <Footer/>
      </>
  );
};

export default Movies;