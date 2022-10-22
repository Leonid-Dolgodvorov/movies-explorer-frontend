import React from "react";
import "./Profile.css"
import Header from "../Header/Header"

function Profile({loggedIn, onUpdateProfileInfo, onSignOut}) {

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProfileInfo(name, email, password);
  }

  return (
    <>
      <Header loggedIn={loggedIn}/>
      <section className="profile">
        <h1 className="profile__title">Привет, Виталий!</h1>
        <form className="profile__form">
          <fieldset className="profile__inputs">
            <label className="profile__label">
              Имя
              <input
                className="profile__input"
                name="profile__name"
                id="profile__name"
                type="text"
                required/>
            </label>
            <span className="profile__input-error"></span>
            <label className="profile__label">
              E-mail
              <input
                className="profile__input"
                name="profile__email"
                id="profile__email"
                type="email"
                required/>
            </label>
            <span className="profile__input-error"></span>
            <button className="profile__button" type="submit" onClick={handleSubmit}>Редактировать</button>
          </fieldset>
        </form>
        <button className="profile__button profile__button-signout" onClick={onSignOut}>Выйти из аккаунта</button>
      </section>
    </>
  );
};

export default Profile;