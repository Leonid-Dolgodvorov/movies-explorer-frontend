import { MY_BASE_URL } from "../utils/constants";

const errorHandler = (err) => {
  if (err === "Ошибка: 400") {
    return "Переданы некорректные данные";
  } else if (err === "Ошибка: 401") {
    return `Ошибка авторизации на ${MY_BASE_URL}`;
  } else if (err === "Ошибка: 404") {
    return "Страница не найдена"; 
  } else if (err === "Ошибка: 409") {
    return "Данный email занят другим пользователем";
  } else if (err === "Ошибка: 429") {
    return "Слишком много запросов";
  } else if (err === "Ошибка: 500" || err === 500){ 
    return "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз";
  } else {
    return "Ошибка (см. консоль)";
  }
};

export default errorHandler;
