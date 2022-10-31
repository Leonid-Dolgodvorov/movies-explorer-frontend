import "./AboutMe.css"
import React from "react"

import avatar from "../../images/avatar.jpg";

const AboutMe = () => {
  return (
    <section className="aboutme">
      <h2 className="aboutme__title">Студент</h2>
        <div className="aboutme__content">
          <div className="aboutme__container">
            <h3 className="aboutme__name">Леонид</h3>
              <p className="aboutme__job">Студент курса по фронтенд-разработке, 34 года</p>
              <p className="aboutme__info">Родился и проживаю в г.Екатеринбург. Закончил бакалавриат и магистратуру УрГУ (ныне УрФУ) по специальности "Экономическая теория".</p>
                <div className="aboutme__links">
                  <div className="aboutme__social-item">
                    <a
                      className="aboutme__link"
                      href="https://t.me/dolgodvorovl"
                      target="_blank"
                      rel="noreferrer">
                      Telegram
                    </a>
                  </div>
                  <div className="aboutme__social-item">
                    <a
                      className="aboutme__link"
                      href="https://github.com/Leonid-Dolgodvorov"
                      target="_blank"
                      rel="noreferrer">
                      Github
                    </a>
                  </div>
                </div>
          </div>
          <img src={avatar} alt="Фотография Леонида" className="aboutme__avatar" />
        </div>
        <div className="portfolio">
          <h3 className="portfolio__title">Портфолио</h3>
          <ul className="portfolio__projects">
            <li className="portfolio__project">
              <a
                className="portfolio__link"
                href="https://leonid-dolgodvorov.github.io/russian-travel/index.html"
                target="_blank"
                rel="noreferrer">
                Статичный сайт
                <p className="portfolio__icon">&#8599;</p>
              </a>
            </li>
            <li className="portfolio__project">
              <a
                className="portfolio__link"
                href="https://leonid-dolgodvorov.github.io/mesto/index.html"
                target="_blank"
                rel="noreferrer">
                Адаптивный сайт
                <p className="portfolio__icon">&#8599;</p>
              </a>
            </li>
            <li className="portfolio__project">
              <a
                className="portfolio__link"
                href="https://leonid-dolgodvorov.github.io/mesto/index.html"
                target="_blank"
                rel="noreferrer">
                Одностраничное приложение
                <p className="portfolio__icon">&#8599;</p>
              </a>
            </li>
          </ul>
        </div>
    </section>
    
  )
}

export default AboutMe;