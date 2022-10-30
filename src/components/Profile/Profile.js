import React from "react";
import Header from "../Header/Header";
import useFormWithValidation from "../../utils/useFormWithValidation";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./Profile.css";

const Profile = ({
  loggedIn,
  isBurgerOpened,
  onBurger,
  onUpdateUserInfo,
  onSignOut}) => {

  const [user, setUser] = React.useState({});

  const currentUser = React.useContext(CurrentUserContext);

  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm
  } = useFormWithValidation();

  React.useEffect(() => {
    setUser(currentUser);
    values.profile_name = currentUser.name;
    values.profile_email = currentUser.email;
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    resetForm()
    onUpdateUserInfo(values.profile_name, values.profile_email);      
  }

  return (
    <>
      <Header 
        loggedIn={loggedIn}
        isBurgerOpened={isBurgerOpened}
        onBurger={onBurger}
        />
      <section className="profile">
        <h1 className="profile__title">Привет, {user.name}!</h1>
        <form className="profile__form" onSubmit={handleSubmit}>
          <fieldset className="profile__inputs">
            <label className="profile__label">
              Имя
              <input
                className="profile__input"
                name="profile_name"
                type="text"
                autoComplete="off"
                minLength="2"
                maxLength="30"
                onChange={handleChange}
                value={values.profile_name || ""}
                required/>
            <span className="profile__input-error">{errors.profile_name}</span>
            </label>
            
            <label className="profile__label">
              E-mail
              <input
                className="profile__input"
                name="profile_email"
                type="email"
                autoComplete="off"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}"
                onChange={handleChange}
                value={values.profile_email || ""}
                required/>
            <span className="profile__input-error">{errors.profile_email}</span>
            </label>
            
            <button
              type="submit"
              disabled={!isValid}
              className={`profile__button 
                ${!isValid && "profile__button_disabled"}
                ${values.profile_name === currentUser.name && 
                values.profile_email === currentUser.email && 
                "profile__button_disabled"}`}
            > Редактировать
            </button>
          </fieldset>
        </form>
        <button
          className="profile__button profile__button-signout"
          onClick={onSignOut}
        > Выйти из аккаунта
        </button>
      </section>
    </>
  );
};

export default Profile;
