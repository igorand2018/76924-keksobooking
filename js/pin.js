'use strict';

window.pin = (function () {
  var PIN_HEIGTH = 87;
  var PIN_WINDTH = 65;
  var mapPin = document.querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');
  var pinsFragment = document.createDocumentFragment();

  return {
    getPins: function () {
      for (var i = 0; i < 5; i++) {
        var newPin = mapPin.cloneNode(true);
        newPin.style.top = window.appData.similarAds[i].location.y - PIN_HEIGTH + 'px';
        newPin.style.left = window.appData.similarAds[i].location.x - (PIN_WINDTH / 2) + 'px';
        newPin.querySelector('img').src = window.appData.similarAds[i].author.avatar;
        newPin.querySelector('img').alt = window.appData.similarAds[i].offer.title;
        newPin.dataset.indexNumber = [i];
        pinsFragment.appendChild(newPin);
      }
      mapPins.appendChild(pinsFragment);
    },
    mapPins: mapPins,
    PIN_HEIGTH: PIN_HEIGTH,
    PIN_WINDTH: PIN_WINDTH
  };
})();


