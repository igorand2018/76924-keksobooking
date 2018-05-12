'use strict';

window.backend = (function () {
  return {
    upload: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.open('POST', 'https://js.dump.academy/keksobooking');
      xhr.send(data);
    },
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          window.similarAds = xhr.response;
          window.pin.filteredArray = window.similarAds.slice();
          onLoad(xhr.response);

        } else {
          var error;
          switch (xhr.status) {
            case 200:
              onLoad(xhr.response);
              break;

            case 400:
              error = 'Неверный запрос';
              break;
            case 401:
              error = 'Пользователь не авторизован';
              break;
            case 404:
              error = 'Ничего не найдено';
              break;

            default:
              error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
          }
        }
        if (error) {
          onError(error);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 10000;

      xhr.open('GET', 'https://js.dump.academy/keksobooking/data');
      xhr.send();
    }
  };
})();

