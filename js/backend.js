'use strict';
// upload
(function () {
  var URL = 'https://js.dump.academy/keksobooking';

  window.upload = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };
})();

// load
// (function () {
//   var URL = 'https://js.dump.academy/keksobooking/data';

//   window.load = function (onSuccess, onError) {
//     var xhr = new XMLHttpRequest();
//     xhr.responseType = 'json';

//     xhr.open('GET', URL);

//     xhr.addEventListener('load', function () {
//       onSuccess(xhr.response);
//     });

//     xhr.send();
//   };
// })();

