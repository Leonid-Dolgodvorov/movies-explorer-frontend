import React from "react";
import "./SearchForm.css";

const isSearchBtnActive = true;

function SearchForm() {
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
            isSearchBtnActive ? 
              <button className="searchform__shorts-btn" type="button"/>
            : <button className="searchform__shorts-btn searchform__shorts-btn-inactive" type="button"/>
            }
          </>              
        </div>
      </div>
    </section>
  );
};

export default SearchForm;

