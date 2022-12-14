import React from "react";
import "./Promo.css"
import logo from "../../images/web.png"

const Promo = () => {
  return (
    <section className="promo">
      <div className="promo__container">
        <div className="promo__text-container">
          <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
          <p className="promo__text">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
          <a href="#aboutproject" className="promo__link">Узнать больше</a>
        </div>
        <img className="promo__logo" src={logo} alt="картинка Web"/>
      </div>
    </section>
  );
};

export default Promo;