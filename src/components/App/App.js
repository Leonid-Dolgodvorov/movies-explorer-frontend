import React from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import "./App.css";
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
  const [isBurgerOpened, setIsBurgerOpened] = React.useState(false)
  const history = useHistory();

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) { 
      auth.getData(jwt) 
        .then((userInfo) => {
          setLoggedIn(true);
          setCurrentUser(JSON.stringify(userInfo));
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
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [loggedIn]);
  
  React.useEffect(() => {
    localStorage.setItem("localMovies", JSON.stringify(allMovies));
    localStorage.setItem("localSavedMovies", JSON.stringify(savedMovies));
    localStorage.setItem("userInfo", currentUser)
  }, [allMovies, savedMovies, currentUser]);

  const handleRegistration = (name, email, password) => {
    auth
      .register(name, email, password)
      .then(() => handleAuthorization(email, password))
      .catch((err) => console.log(err))
  };

  const handleAuthorization = (email, password) => {
    auth
      .authorize(email, password)
      .then((data) => auth.getData(data.token))
      .then((userInfo) => {
        setCurrentUser(JSON.stringify(userInfo));
        setLoggedIn(true);
        history.push("/movies");
      })
      .catch((err) => console.log(err))
  };

  const handleUpdateUserInfo = (name, email) => {
    mainApi
        .editUserInfo(name, email)
        .then((userInfo) => {
            setCurrentUser(JSON.stringify(userInfo));
        })
        .catch((err) => console.log(err))
  };

  const handleSignOut = () => {
    setLoggedIn(false);
    setIsBurgerOpened(false);
    localStorage.removeItem("jwt");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("localSavedMovies");
    localStorage.removeItem("localMovies");
    history.push("/");
  };

  const handleBurger = () => {
    setIsBurgerOpened(!isBurgerOpened);
  };
  
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
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
            component={Movies}/>
          <ProtectedRoute
            path="/saved-movies"
            loggedIn={loggedIn}
            isBurgerOpened={isBurgerOpened}
            onBurger={handleBurger}
            allMovies={allMovies}
            savedMovies={savedMovies}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            component={SavedMovies}/>
          <ProtectedRoute
            path="/profile"
            loggedIn={loggedIn}
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
            <NotFound/>
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
