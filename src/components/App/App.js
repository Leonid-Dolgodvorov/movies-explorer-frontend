import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";

function App() {
  
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Main/>
        </Route>
         <Route path="/movies">
          <Movies isLoggedIn="true"/>
        </Route>
        <Route path="/saved-movies">
          <SavedMovies isLoggedIn="true"/>
        </Route>
        <Route path="/profile">
          <Profile isLoggedIn="true"/>
        </Route>
        <Route path="/signin">
          <Login/>
        </Route>
        <Route path="/signup">
          <Register/>
        </Route>
        <Route path="*">
          <NotFound/>
        </Route>
      </Switch>
    </div>
  );
};

export default App;
