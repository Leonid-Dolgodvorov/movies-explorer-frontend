import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css"
import Burger from "../Burger/Burger"

const Header = ({loggedIn, isBurgerOpened, onBurger}) => {

  const location = useLocation();

  return (
    <>
      {
        !loggedIn ?
          <header className="header header-main">
            <Link className="header-logo" to="/" />
            <nav className="header-nav">
              <Link
                className="button__header button__header_white-text"
                to="/signup">Регистрация</Link>
              <Link
                className="button__header button__header_green"
                to="/signin">Войти</Link>
            </nav>
          </header>
        : 
          <header className={location.pathname === "/" ?
            "header header-main"
            :
            "header"}
            >
            <Link className="header-logo" to="/" />            
            <nav className="header-nav header-nav_signed-in">
              <Link className={location.pathname === "/movies" ?
                "button__header button_header-loggedin button_header-loggedin-active" 
                : 
                "button__header button_header-loggedin"} 
                to="/movies">Фильмы</Link>
              <Link className={location.pathname === "/saved-movies" ?
                "button__header button_header-loggedin button_header-loggedin-active"
                :
                "button__header button_header-loggedin"} 
                to="/saved-movies">Сохраненные фильмы</Link>
              <Link className="button__header button__header_account" to="/profile">Аккаунт</Link>
            </nav>
            <button 
              type="button"
              className="header__burger"
              onClick={onBurger}/>
          </header>          
      }
      { 
            !isBurgerOpened ?
              <>
              </>
            :
              <Burger onClose={onBurger}/>
          }
    </>
  );
};

export default Header;