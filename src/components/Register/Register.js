import React from "react";
import { Link } from 'react-router-dom';
import "./Register.css";

function Register({onRegister}) {

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
    onRegister(name, email, password);
  }

  return (
    <section className='register'>
      <form className='register__form' onSubmit={handleSubmit}>
        <Link to="/" className="register__logo"/>
        <h1 className='register__title'>Добро пожаловать!</h1>
        <label className="register__label">Имя</label>
        <input 
          className="register__input"
          name="name"
          type="text"
          id="name"
          autoComplete="off"
          onChange={handleNameChange}
          required/>
        <span className="register__input-error"></span>

        <label className="register__label">E-mail</label>
        <input 
          className="register__input"
          name="email"
          type="email"
          id="email"
          autoComplete="off"
          onChange={handleEmailChange}
          required/>
        <span className="register__input-error"></span>

        <label className="register__label">Пароль</label>
        <input 
          className="register__input"
          name="password"
          type="password"
          id="password"
          autoComplete="off"
          onChange={handlePasswordChange}
          required/>
        <span className="register__input-error"></span>

        <button type="submit" className="register__button">Зарегистрироваться</button>
        <p className='register__link-text'>Уже зарегистрированы? <Link className='register__link' to='/signin'>Войти</Link></p>
      </form>
    </section>
  )
}

export default Register;