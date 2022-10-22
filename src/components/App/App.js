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

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [allMovies, setAllMovies] = React.useState([]);
  const [savedMovies, setsavedMovies] = React.useState([]);
  const history = useHistory();

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      Promise.all([auth.getData(jwt), moviesApi.getMovies(), mainApi.getUserMovies()])
        .then(([userInfo, allMoviesList, savedMoviesList]) => {
          setLoggedIn(true);
          setCurrentUser(userInfo);
          setAllMovies(allMoviesList);
          setsavedMovies(savedMoviesList.data);
          history.push("/");
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      handleSignOut()
    }            
  }, []);
  
  const handleRegistration = (name, email, password) => {
    auth
      .register(name, email, password)
      .then(() => handleAuthorization(email, password))
      .catch((err) => console.log(err))
  };

  const handleAuthorization = (email, password) => {
    auth
      .authorize(email, password)
      .then(() => mainApi.getUserMovies())
      .then((res) => {
          setLoggedIn(true);
          history.push("/");
      })
      .catch((err) => console.log(err))
  };

  const handleSignOut = () => {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    history.push("/signup");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Main loggedIn={loggedIn}/>
          </Route>
          <ProtectedRoute
            path="/movies"
            loggedIn={loggedIn}
            component={Movies}/>
          <ProtectedRoute 
            path="/saved-movies"
            loggedIn={loggedIn}
            component={SavedMovies}/>
          <ProtectedRoute 
            path="/profile"
            loggedIn={loggedIn}
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
