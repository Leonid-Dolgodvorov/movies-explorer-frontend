import React from "react";
import { Link } from 'react-router-dom';
import "./Register.css";

function Register() {
  return (
    <section className='register'>
      <form className='register__form'>
        <Link to="/" className="register__logo"/>
        <h1 className='register__title'>Добро пожаловать!</h1>
        <label className="register__label">Имя</label>
        <input className="register__input" name="name" type="text" id="name" value="Виталий"/>
        <span className="register__input-error"></span>

        <label className="register__label">E-mail</label>
        <input className="register__input register__input-correct" name="email" type="email" id="email" value="pochta@yandex.ru"/>
        <span className="register__input-error"></span>

        <label className="register__label">Пароль</label>
        <input className="register__input register__input-invalid" name="password" type="password"  id="password" value="••••••••••••••"/>
        <span className="register__input-error">Что-то пошло не так...</span>

        <button type="submit" className="register__button">Зарегистрироваться</button>
        <p className='register__link-text'>Уже зарегистрированы? <Link className='register__link' to='/signin'>Войти</Link></p>
      </form>
    </section>
  )
}

export default Register;