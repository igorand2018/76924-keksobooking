'use strict';

window.pin = (function () {
  var PIN_HEIGHT = 87;
  var PIN_WINDTH = 65;
  var mapFiltersForm = document.querySelector('.map__filters');
  var housingTypeSelect = document.querySelector('#housing-type');
  var housingPriceSelect = document.querySelector('#housing-price');
  var housingRoomsSelect = document.querySelector('#housing-rooms');
  var housingGuestsSelect = document.querySelector('#housing-guests');

  var filterWifi = mapFiltersForm.querySelector('#filter-wifi');
  // var filterDishwasher = mapFiltersForm.querySelector('#filter-dishwasher');
  // var filterParking = mapFiltersForm.querySelector('#filter-parking');
  // var filterWasher = mapFiltersForm.querySelector('#filter-washer');
  // var filterElevator = mapFiltersForm.querySelector('#filter-elevator');
  // var filterConditioner = mapFiltersForm.querySelector('#filter-conditioner');

  var mapPin = document.querySelector('template')
      .content
      .querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');
  var pinsFragment = document.createDocumentFragment();

  mapFiltersForm.addEventListener('change', function () {
    window.pin.filterallSelects();
  });

  var HOUSING_PRICE = {
    'any': 'ad.offer.price > 0',
    'low': 'ad.offer.price < 10000',
    'middle': 'ad.offer.price > 10000',
    'high': 'ad.offer.price > 50000'
  };
  // window.similarAds.
  // filter(function (ad) {
  //   return window.pin.HOUSING_PRICE[window.pin.housingPriceSelect.value];
  // });
  var HOUSING_ROOMS = {
    'any': 0,
    '1': 1,
    '2': 2,
    '3': 3
  };

  var HOUSING_GUESTS = {
    'any': 0, // должно быть >= 0
    '1': 1,
    '2': 2
  };

  return {
    getPins: function (offersArray) {
      for (var i = 0; i < 5; i++) {
        var newPin = mapPin.cloneNode(true);
        newPin.style.left = offersArray[i].location.x - Math.ceil(PIN_WINDTH / 2) + 'px';
        newPin.style.top = offersArray[i].location.y - PIN_HEIGHT + 'px';
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
    filterallSelects: function () {
      var filteredArray = window.similarAds.
          filter(function (ad) {
            return ad.offer.type === window.pin.housingTypeSelect.value;
          }).
          filter(function (ad) {
            return ad.offer.guests === HOUSING_ROOMS[window.pin.housingRoomsSelect.value];
          }).
          filter(function (ad) {
            return ad.offer.guests === HOUSING_GUESTS[window.pin.housingGuestsSelect.value];
          });

      return filteredArray;
    },
    mapPins: mapPins,
    PIN_HEIGHT: PIN_HEIGHT,
    PIN_WINDTH: PIN_WINDTH,
    housingTypeSelect: housingTypeSelect,
    housingPriceSelect: housingPriceSelect,
    housingRoomsSelect: housingRoomsSelect,
    housingGuestsSelect: housingGuestsSelect,
    HOUSING_ROOMS: HOUSING_ROOMS,
    filterWifi: filterWifi,
    HOUSING_PRICE: HOUSING_PRICE
  };
})();

