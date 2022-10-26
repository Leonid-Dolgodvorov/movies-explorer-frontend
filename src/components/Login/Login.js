import React from "react";
import { Link } from 'react-router-dom';
import useFormWithValidation from "../../utils/useFormWithValidation";
import "./Login.css";

const Login = ({onLogin}) => {

  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm
  } = useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values.login_email, values.login_password);
    resetForm();
  }

  return (
    <section className='login'>
      <form className='login__form' onSubmit={handleSubmit}>
        <Link to="/" className="login__logo"/>
        <h1 className='login__title'>Рады видеть!</h1>
        <label className="login__label">E-mail</label>
        <input
          className="login__input"
          name="login_email"
          type="email"
          autoComplete="off"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}"
          onChange={handleChange}
          value={values.login_email || ""}
          required/>
        <span className="login__input-error">{errors.login_email}</span>

        <label className="login__label">Пароль</label>
        <input
          className="login__input"
          name="login_password"
          type="password"
          autoComplete="off"
          onChange={handleChange}
          value={values.login_password || ""}
          required/>
        <span className="login__input-error">{errors.login_password}</span>

        <button
          type="submit"
          disabled={!isValid}
          className={`login__button ${!isValid && "login__button_disabled"}`}
        > Войти
        </button>
        <p
          className="login__link-text"
        > Еще не зарегистрированы? 
          <Link
            className="login__link"
            to="/signup"
          > Регистрация
          </Link>
        </p>
      </form>
    </section>
  )
}

export default Login;