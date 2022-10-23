import React from "react";
import "./Profile.css"
import Header from "../Header/Header"

function Profile({loggedIn, onUpdateUserInfo, onSignOut}) {

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUserInfo(name, email);
  }

  return (
    <>
      <Header loggedIn={loggedIn}/>
      <section className="profile">
        <h1 className="profile__title">Привет, Виталий!</h1>
        <form className="profile__form" onSubmit={handleSubmit}>
          <fieldset className="profile__inputs">
            <label className="profile__label">
              Имя
              <input
                className="profile__input"
                name="profile__name"
                type="text"
                id="profile__name"
                autoComplete="off"
                onChange={handleNameChange}
                required/>
            </label>
            <span className="profile__input-error"></span>
            <label className="profile__label">
              E-mail
              <input
                className="profile__input"
                name="profile__email"
                type="email"
                id="profile__email"
                autoComplete="off"
                onChange={handleEmailChange}
                required/>
            </label>
            <span className="profile__input-error"></span>
            <button className="profile__button" type="submit">Редактировать</button>
          </fieldset>
        </form>
        <button className="profile__button profile__button-signout" onClick={onSignOut}>Выйти из аккаунта</button>
      </section>
    </>
  );
};

export default Profile;