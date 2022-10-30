import React from "react";
import { Link } from 'react-router-dom';
import useFormWithValidation from "../../utils/useFormWithValidation";
import "./Register.css";

const Register = ({onRegister}) => {

  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm
  } = useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(values.register_name, values.register_email, values.register_password);
    resetForm();
  }

  return (
    <section className='register'>
      <form className='register__form' onSubmit={handleSubmit}>
        <Link to="/" className="register__logo"/>
        <h1 className='register__title'>Добро пожаловать!</h1>
        <label className="register__label">Имя</label>
        <input
          className="register__input"
          name="register_name"
          type="text"
          autoComplete="off"
          minLength="2"
          maxLength="30"
          onChange={handleChange}
          value={values.register_name || ""}
          required/>
        <span className="register__input-error">{errors.register_name}</span>

        <label className="register__label">E-mail</label>
        <input
          className="register__input"
          name="register_email"
          type="email"
          autoComplete="off"
          pattern="[a-z0-9._%+-]+@([a-z0-9.-]+\.)+[a-z]{2,4}"
          onChange={handleChange}
          value={values.register_email || ""}
          required/>
        <span className="register__input-error">{errors.register_email}</span>

        <label className="register__label">Пароль</label>
        <input
          className="register__input"
          name="register_password"
          type="password"
          autoComplete="off"
          onChange={handleChange}
          value={values.register_password || ""}
          required/>
        <span className="register__input-error">{errors.register_password}</span>

        <button
          type="submit"
          disabled={!isValid}
          className={`register__button ${!isValid && "register__button_disabled"}`}
          > Зарегистрироваться
        </button>
        <p
          className="register__link-text"
        > Уже зарегистрированы? 
          <Link
            className="register__link"
            to="/signin"
          > Войти
          </Link>
        </p>
      </form>
    </section>
  )
}

export default Register;