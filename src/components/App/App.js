import React from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import "./App.css";
import Popup from "../Popup/Popup";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import * as auth from "../../utils/auth";
import mainApi from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";

function App() {

  const [loggedIn, setLoggedIn] = React.useState(localStorage.jwt || false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [allMovies, setAllMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [isBurgerOpened, setIsBurgerOpened] = React.useState(false);
  const [isSearchBtnHandled, setIsSearchBtnHandled] = React.useState(false);
  const [isPopupOpened, setIsPopupOpened] = React.useState(true);
  const [isErrored, setIsErrored] = React.useState(false);
  const [popupText, setPopupText] = React.useState("проверка");
  const history = useHistory();

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) { 
      auth.getData(jwt) 
        .then((userInfo) => {
          setLoggedIn(true);
          setCurrentUser(userInfo);
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      handleSignOut()
    }
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([moviesApi.getMovies(), mainApi.getUserMovies()])
        .then(([allMoviesList, savedMoviesList]) => {
          setAllMovies(allMoviesList);
          setSavedMovies(savedMoviesList.data);
          setIsSearchBtnHandled(true);
        })
        .catch((err) => openErrorPopup(err))
    }
  }, [loggedIn]);

/*   React.useEffect(() => {
    if (localStorage.getItem("foundMovies") || localStorage.getItem("foundSavedMovies")) {
          setIsSearchBtnHandled(true);
    }
  }, [localStorage.getItem("foundMovies"), localStorage.getItem("foundSavedMovies")]); */
  const openErrorPopup = (err) => {
    setIsPopupOpened(true);
    setIsErrored(true);
    setPopupText(err);
  }

  const openSuccessPopup = (res) => {
    setIsPopupOpened(true);
    setIsErrored(false);
    setPopupText(res);
  }

  const closePopup = () => {
    setIsPopupOpened(false);
    setPopupText('');
  }

  const handleRegistration = (name, email, password) => {
    auth
      .register(name, email, password)
      .then(() => handleAuthorization(email, password))
      .catch((err) => openErrorPopup(err));
  };

  const handleAuthorization = (email, password) => {
    auth
      .authorize(email, password)
      .then((data) => auth.getData(data.token))
      .then((userInfo) => {
        setCurrentUser(userInfo);
        setLoggedIn(true);
        history.push("/movies");
      })
      .catch((err) => openErrorPopup(err))
  };

  const handleUpdateUserInfo = (name, email) => {
    mainApi
        .editUserInfo(name, email)
        .then((userInfo) => {
            setCurrentUser(userInfo.data);
            openSuccessPopup("Данные успешно изменены")
        })
        .catch((err) => openErrorPopup(err))
  };

  const handleSignOut = () => {
    setLoggedIn(false);
    setIsBurgerOpened(false);
    setIsSearchBtnHandled(false);
    localStorage.removeItem("jwt");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("foundSavedMovies");
    localStorage.removeItem("foundMovies");
    history.push("/");
  };

  const handleBurger = () => {
    setIsBurgerOpened(!isBurgerOpened);
  };

  const saveMovie = (movie) => {
    mainApi.addCard({
      nameRU: movie.nameRU.substring(0, 29),
      nameEN: movie.nameEN.substring(0, 29),
      director: movie.director.substring(0, 29),
      country: movie.country.substring(0, 29),
      year: movie.year,
      duration: movie.duration,
      description: movie.description.substring(0, 199),
      trailerLink: movie.trailerLink,
      url: movie.image.url,
      movieId: movie.id.toString(),      
     })
      .then(() => mainApi.getUserMovies())
      .then((savedMoviesList) => setSavedMovies(savedMoviesList.data))
      .catch((err) => {
        console.log(err);
      })
  };

  const deleteMovie = (movieId) => {
    console.log(movieId)
    mainApi.deleteCard(movieId)
      .then(() => mainApi.getUserMovies())
      .then((savedMoviesList) => setSavedMovies(savedMoviesList.data))
      .catch((err) => {
        console.log(err);
      })
  }

  const handleReturn = () => {
    history.goBack();
  };
  
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Popup
          isErrored={isErrored}
          popupText={popupText}
          isPopupOpened={isPopupOpened}
          setIsPopupOpened={setIsPopupOpened}
          closePopup={closePopup}
          />
        <Switch>
          <Route exact path="/">
            <Main 
              loggedIn={loggedIn}
              isBurgerOpened={isBurgerOpened}
              onBurger={handleBurger}/>
          </Route>
          <ProtectedRoute
            path="/movies"
            loggedIn={loggedIn}
            isBurgerOpened={isBurgerOpened}
            onBurger={handleBurger}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            isSearchBtnHandled={isSearchBtnHandled}
            setIsSearchBtnHandled={setIsSearchBtnHandled}
            allMovies={allMovies}
            savedMovies={savedMovies}
            saveMovie={saveMovie}
            deleteMovie={deleteMovie}
            component={Movies}/>
          <ProtectedRoute
            path="/saved-movies"
            loggedIn={loggedIn}
            isBurgerOpened={isBurgerOpened}
            onBurger={handleBurger}
            savedMovies={savedMovies}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            component={SavedMovies}/>
          <ProtectedRoute
            path="/profile"
            loggedIn={loggedIn}
            currentUser={currentUser}
            onUpdateUserInfo={handleUpdateUserInfo}
            onSignOut={handleSignOut}
            component={Profile}/>
          <Route path="/signin">
            <Login onLogin={handleAuthorization}/>
          </Route>
          <Route path="/signup">
            <Register onRegister={handleRegistration}/>
          </Route>
          <Route path="*">
            <NotFound
              handleReturn={handleReturn}/>
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
