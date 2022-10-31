import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Burger.css"

const Burger = ({onClose}) => {

  const location = useLocation();
  
  return (
    <section className="burger">
      <div className="burger__container">
        <button
          type="button"
          className="burger__button"
          onClick={onClose}/>
        <div className="burger__wrapper">
          <div className="burger__links">
            <Link
              to="/"
              onClick={onClose}
              className={`burger__link ${location.pathname === "/" ?
              "burger__link_active"
              : ""}
              `}
            >
              Главная
            </Link>
            <Link
              to="/movies"
              onClick={onClose}
              className={`burger__link ${location.pathname === "/movies" ?
              "burger__link_active"
              : ""}
              `}
            >
              Фильмы
            </Link>
            <Link
              to="/saved-movies"
              onClick={onClose}
              className={`burger__link ${location.pathname === "/saved-movies" ?
              "burger__link_active"
              : ""}
              `}
            >
              Сохранённые фильмы
            </Link>
          </div>
          <Link
            to="/profile"
            onClick={onClose}
            className="burger__account-button"
          >
            Аккаунт
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Burger;