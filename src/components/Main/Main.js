import React from "react";

import './Main.css';
import Header from "../Header/Header";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Footer from "../Footer/Footer";

const Main = ({loggedIn, isBurgerOpened, onBurger}) => {
  return (
    <>
      <Header 
        loggedIn={loggedIn}
        isBurgerOpened={isBurgerOpened}
        onBurger={onBurger}/> 
      <div className="main">             
        <Promo/>
        <AboutProject/>
        <Techs/>
        <AboutMe/>
      </div>
      <Footer/>
    </>
  );
};

export default Main;