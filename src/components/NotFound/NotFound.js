import React from "react";
import "./NotFound.css";

const NotFound = ({handleReturn}) => {
  return (
    <section className="not-found">
      <div className="not-found__wrapper">
        <p className="not-found__error">404</p>
        <h2 className="not-found__title">Страница не найдена</h2>
      </div>
      <button
        type="button"
        className="not-found__button"
        onClick={handleReturn}
        >Назад</button>
    </section>
  );
};

export default NotFound;