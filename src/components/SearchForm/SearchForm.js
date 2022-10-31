import React from "react";
import "./SearchForm.css";

const SearchForm = ({
  isShortBtnActive,
  handleShortBtn,
  handleSearch,
  searchQuery,
  setSearchQuery}) => {

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <section className="searchform">
      <div className="searchform__wrapper">
        <form 
          className="searchform__form"
          noValidate
          onSubmit={handleSearch}>

          <input
            className="searchform__input"
            type="text"
            placeholder="Фильм"
            required
            value={searchQuery}
            onChange={handleSearchChange}/>
          <button
            className="searchform__search-btn"
            type="submit"/>
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
                className="searchform__shorts-btn
                  searchform__shorts-btn-inactive"
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
