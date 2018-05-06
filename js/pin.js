'use strict';

window.pin = (function () {
  var PIN_HEIGTH = 87;
  var PIN_WINDTH = 65;
  var mapFiltersForm = document.querySelector('.map__filters');
  var housingTypeSelect = document.querySelector('#housing-type');
  var housingPriceSelect = document.querySelector('#housing-price');
  var housingRoomsSelect = document.querySelector('#housing-rooms');
  var housingGuestsSelect = document.querySelector('#housing-guests');
  var mapPin = document.querySelector('.map__pin');
  var allMapPins = document.querySelectorAll('.map__pin');
  var mapPins = document.querySelector('.map__pins');
  var pinsFragment = document.createDocumentFragment();

  mapFiltersForm.addEventListener('change', function () {
    filterallSelects();
  });

  var HOUSING_PRICE = {
    'any': 'ad.offer.rooms > 0',
    'low': 'ad.offer.rooms < 10000',
    'middle': 'ad.offer.rooms > 10000',
    'high': 'ad.offer.rooms > 50000'
  };

  var HOUSING_ROOMS = {
    'any': 0,
    '1': 1,
    '2': 2,
    '3': 3
  };

  var HOUSING_GUESTS = {
    'any': 0,
    '1': 1,
    '2': 2
  };

  function filterallSelects() {
    window.similarAds.filter(function (ad) {
      return ad.offer.type === housingTypeSelect.value;
    }).filter(function (ad) {
      return ad.offer.rooms === HOUSING_ROOMS[housingRoomsSelect.value];
    }).filter(function (ad) {
      return ad.offer.guests === HOUSING_GUESTS[housingGuestsSelect.value];
    }).filter(function () {
      return HOUSING_PRICE[housingPriceSelect.value];
    });
  }

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
    removePins: function () {
      var oldPins = window.pin.mapPins.querySelectorAll('.map__pin');
      for (var i = oldPins.length - 1; i >= 1; i--) {
        window.pin.mapPins.removeChild(oldPins[i]);
      }
    },
    allMapPins: allMapPins,
    mapPins: mapPins,
    PIN_HEIGTH: PIN_HEIGTH,
    PIN_WINDTH: PIN_WINDTH
  };
})();

