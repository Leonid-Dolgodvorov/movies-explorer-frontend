import React from "react";
import "./Profile.css"
import Header from "../Header/Header"

function Profile() {
  return (
    <section className="profile">
      <Header />
        <h1 className="profile__title">Привет, Виталий!</h1>
        <form className="profile__form" noValidate>
          <fieldset className="profile__inputs">
            <label className="profile__label">Имя
              <input className="profile__input" name="profile__name" id="profile__name" type="text" value="Виталий"/>
            </label>
            <span className="profile__input-error"></span>
            <label className="profile__label">E-mail
              <input className="profile__input" name="profile__email" id="profile__email" type="email" value="pochta@yandex.ru"/>
            </label>
            <span className="profile__input-error"></span>
            <button className="profile__button" type="submit">Редактировать</button>
          </fieldset>
        </form>
        <button className="profile__button profile__button-signout">Выйти из формы</button>
    </section>
  );
};

export default Profile;