import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <p className="footer__text">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
          <div className="footer__container">
            <p className="footer__year">&#169;2022</p>
            <ul className="footer__links">
              <li className="footer__link">
                <a
                  className="footer__link-text"
                  href="https://practicum.yandex.ru"
                  target="_blank"
                  rel="noreferrer">
                  Яндекс.Практикум
                </a>
              </li>
              <li className="footer__link">
                <a
                  className="footer__link-text"
                  href="https://github.com/Leonid-Dolgodvorov"
                  target="_blank"
                  rel="noreferrer">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
    </footer>
  );
};

export default Footer;