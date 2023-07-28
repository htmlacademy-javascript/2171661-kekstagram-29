import {showAlert} from './utils.js';

const getData = (onSuccess) => {
  fetch('https://29.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((photo) => onSuccess(photo))
    .catch(() => {
      showAlert('Не удалось получить изображения. Обновите страницу');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://29.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  ).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    }
  })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {getData, sendData};
