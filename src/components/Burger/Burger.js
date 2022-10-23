import React from "react";
import { Link } from "react-router-dom";
import "./Burger.css"

function Burger({onClose}) {
  return (
    <section className="burger">
      <div className="burger__container">
        <button
          type="button"
          className="burger__button"
          onClick={onClose}/>
        <div className="burger__wrapper">
          <div className="burger__links">
            <Link exact to="/" className="burger__link">Главная</Link>
            <Link to="/movies" className="burger__link burger__link_active">Фильмы</Link>
            <Link to="/saved-movies" className="burger__link">Сохранённые фильмы</Link>
          </div>
          <Link to="/profile" className="burger__account-button">Аккаунт</Link>
        </div>
      </div>
    </section>
  )
}

export default Burger;