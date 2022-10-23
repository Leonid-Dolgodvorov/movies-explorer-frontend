import React from "react";
import "./SearchForm.css";

function SearchForm() {

  const [isShortBtnActive, setIsShortBtnActive] = React.useState(false)

  const handleShortBtn = () => {
    setIsShortBtnActive(!isShortBtnActive);
  }

  return (
    <section className="searchform">
      <div className="searchform__wrapper">
        <form className="searchform__form">
          <input className="searchform__input" type="text" placeholder="Фильм" required/>
          <button className="searchform__search-btn" type="submit" ></button>
          <span className="searchform__error"></span>
        </form>
        <div className="searchform__short-films">
          <label className="searchform__text">Короткометражки</label>
          <>
            { 
            isShortBtnActive ? 
              <button 
                className="searchform__shorts-btn"
                type="button"
                onClick={handleShortBtn}/>
            : <button
              className="searchform__shorts-btn searchform__shorts-btn-inactive"
              type="button"
              onClick={handleShortBtn}/>
            }
          </>              
        </div>
      </div>
    </section>
  );
};

export default SearchForm;
