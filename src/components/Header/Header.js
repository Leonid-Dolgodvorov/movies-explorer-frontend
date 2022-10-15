import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"

const isLoggedIn = false;
const isBurgerOpened = false;

function Header() {
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
              <Link className="button__header" to="/movies">Фильмы</Link>
              <Link className="button__header" to="/saved-movies">Сохраненные фильмы</Link>
              <Link className="button__header button__header_grey" to="/profile">Аккаунт</Link>
            </nav>
            <button className="header__burger"/>
          </header>
      }
    </>
  );
};

export default Header;