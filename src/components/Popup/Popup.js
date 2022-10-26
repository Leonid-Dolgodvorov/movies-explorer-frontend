import successImage from '../../images/successImage.svg';
import failImage from '../../images/failImage.svg';
import "./Popup.css"

const Popup = ({ isErrored, popupText, isPopupOpened, setIsPopupOpened, closePopup }) => {

  return (
    <div className={`popup ${isPopupOpened && "popup_opened"}`}
      >
      <div className="popup__container">
        <img 
          src={isErrored ? failImage : successImage}
          alt={isErrored ? "Ошибка" : "Успешно"}
          className="popup__image"/>
        <p className="popup__text">{popupText}</p>
        <button
          className="popup__close-button"
          type="button"
          onClick={closePopup}>
        </button>
      </div>
    </div>
  )
};

export default Popup;