import React from "react";
import { Link } from 'react-router-dom';
import "./Login.css";
/* import useFormWithValidation from "../../utils/useFormWithValidation"; */

function Login({onLogin}) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
/*   const {values, handleChange, errors, isValid, resetForm} = useFormWithValidation(); */

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  }

  return (
    <section className='login'>
      <form className='login__form' onSubmit={handleSubmit}>
        <Link to="/" className="login__logo"/>
        <h1 className='login__title'>Рады видеть!</h1>
        <label className="login__label">E-mail</label>
        <input
          className="login__input"
          name="email"
          type="email"
          id="email"
          autoComplete="off"
          onChange={handleEmailChange}
          value={email || ""}
          required/>
        <span className="login__input-error"></span>

        <label className="login__label">Пароль</label>
        <input
          className="login__input"
          name="password"
          type="password"
          id="password"
          autoComplete="off"
          onChange={handlePasswordChange}
          value={password || ""}
          required/>
        <span className="login__input-error"></span>

        <button type="submit" className="login__button">Войти</button>
        <p className='login__link-text'>Еще не зарегистрированы? <Link className='login__link' to='/signup'>Регистрация</Link></p>
      </form>
    </section>
  )
}

export default Login;