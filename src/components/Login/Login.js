import React from "react";
import { Link } from 'react-router-dom';
import "./Login.css";

function Login() {
  return (
    <section className='login'>
      <form className='login__form'>
        <Link to="/" className="login__logo"/>
        <h1 className='login__title'>Рады видеть!</h1>
        <label className="login__label">E-mail</label>
        <input className="login__input " name="email" type="email" id="email" value="pochta@yandex.ru" required/>
        <span className="login__input-error"></span>

        <label className="login__label">Пароль</label>
        <input className="login__input" name="password" type="password"  id="password" required/>
        <span className="login__input-error"></span>

        <button type="submit" className="login__button">Войти</button>
        <p className='login__link-text'>Еще не зарегистрированы? <Link className='login__link' to='/signup'>Регистрация</Link></p>
      </form>
    </section>
  )
}

export default Login;