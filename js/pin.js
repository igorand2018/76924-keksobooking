'use strict';

(function () {
  var PIN_HEIGTH = 87;
  var PIN_WINDTH = 65;
  var mapPin = document.querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');
  var pinsFragment = document.createDocumentFragment();
  window.pin = {
    getPins: function () {
      for (var i = 0; i < window.ADS; i++) {
        var newPin = mapPin.cloneNode(true);
        newPin.style.top = window.similarAds[i].location.y - PIN_HEIGTH + 'px';
        newPin.style.left = window.similarAds[i].location.x - (PIN_WINDTH / 2) + 'px';
        newPin.querySelector('img').src = window.similarAds[i].author.avatar;
        newPin.querySelector('img').alt = window.similarAds[i].offer.title;
        newPin.dataset.indexNumber = [i];
        pinsFragment.appendChild(newPin);
      }
      mapPins.appendChild(pinsFragment);
    }
  };
  window.mapPin = mapPin;
  window.mapPins = mapPins;
  window.PIN_HEIGTH = PIN_HEIGTH;
  window.PIN_WINDTH = PIN_WINDTH;
})();


