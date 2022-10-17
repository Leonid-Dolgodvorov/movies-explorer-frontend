import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"
import Burger from "../Burger/Burger"

const isBurgerOpened = false;

function Header({isLoggedIn}) {
  return (
    <>
      {
        !isLoggedIn ?
          <header className="header header-main">
            <Link className="header-logo" to="/" />
            <nav className="header-nav">
              <Link className="button__header button__header_white-text" to="/signup">Регистрация</Link>
              <Link className="button__header button__header_green" to="/signin">Войти</Link>
            </nav>
          </header>
        : 
          <header className="header">
            <Link className="header-logo" to="/" />            
            <nav className="header-nav header-nav_signed-in">
              <Link className="button__header button_header-loggedin button_header-loggedin-active" to="/movies">Фильмы</Link>
              <Link className="button__header button_header-loggedin" to="/saved-movies">Сохраненные фильмы</Link>
              <Link className="button__header button__header_account" to="/profile">Аккаунт</Link>
            </nav>
            <button className="header__burger"/>
          </header>          
      }
      { 
            !isBurgerOpened ?
              <>
              </>
            :
              <Burger />
          }
    </>
  );
};

export default Header;