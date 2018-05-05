'use strict';

window.pin = (function () {
  var PIN_HEIGTH = 87;
  var PIN_WINDTH = 65;
  var mapPin = document.querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');
  var pinsFragment = document.createDocumentFragment();

  return {
    getPins: function (offersArray) {
      for (var i = 0; i < 5; i++) {
        var newPin = mapPin.cloneNode(true);
        newPin.style.top = offersArray[i].location.y - PIN_HEIGTH + 'px';
        newPin.style.left = offersArray[i].location.x - (PIN_WINDTH / 2) + 'px';
        newPin.querySelector('img').src = offersArray[i].author.avatar;
        newPin.querySelector('img').alt = offersArray[i].offer.title;
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


