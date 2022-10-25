import React from "react";
import "./SavedMovies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer"

function Movies({loggedIn, isBurgerOpened, onBurger, isLoading, setIsLoading, saveMovie, deleteMovie}) {

  const [sliceQuantity, setSliceQuantity] = React.useState(0);
  const [isShortBtnActive, setIsShortBtnActive] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [slicedMoviesArr, setSlicedMoviesArr] = React.useState([]);
  
  const localSavedMovies = localStorage.getItem("localSavedMovies");

  React.useEffect(() => {
    if (localSavedMovies) {
      setSlicedMoviesArr((JSON.parse(localSavedMovies).slice(0, sliceQuantity)));
    }
  }, [localSavedMovies, sliceQuantity]);

  React.useEffect(() => {
    if (window.innerWidth >= 1280) {
      setSliceQuantity(8);
    } else if (window.innerWidth > 480 && window.innerWidth < 1280) {
      setSliceQuantity(5);
    } else if (window.innerWidth <= 480) {
      setSliceQuantity(2);
    }
  }, []);

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
      <div className="saved-movies">
        <SearchForm
          isShortBtnActive={isShortBtnActive}
          setIsShortBtnActive={setIsShortBtnActive}
          handleShortBtn={handleShortBtn}
          setInputValue={setInputValue}
          handleFind={handleFind}
          />
        <MoviesCardList
          slicedMoviesArr={isShortBtnActive ? 
            findShortMovies(JSON.parse(localSavedMovies)) 
            :
            slicedMoviesArr
          }
          localSavedMovies={JSON.parse(localSavedMovies)}
          saveMovie={saveMovie}
          deleteMovie={deleteMovie}
          isLoading={isLoading}/>
      </div>      
      <Footer/>
      </>
  );
};

export default Movies;