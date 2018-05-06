'use strict';

window.pin = (function () {
  var PIN_HEIGTH = 87;
  var PIN_WINDTH = 65;
  var mapPin = document.querySelector('.map__pin');
  var allMapPins = document.querySelectorAll('.map__pin');
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
    allMapPins: allMapPins,
    mapPins: mapPins,
    PIN_HEIGTH: PIN_HEIGTH,
    PIN_WINDTH: PIN_WINDTH
  };
})();
var mapFiltersForm = document.querySelector('.map__filters');
var housingTypeSelect = document.querySelector('#housing-type');
var housingPriceSelect = document.querySelector('#housing-price');
var housingRoomsSelect = document.querySelector('#housing-rooms');
var housingGuestsSelect = document.querySelector('#housing-guests');

mapFiltersForm.addEventListener('change', function () {
  filterallSelects();
});

var housingPrice = {
  'any': 'ad.offer.rooms > 0',
  'low': 'ad.offer.rooms < 10000',
  'middle': 'ad.offer.rooms > 10000',
  'high': 'ad.offer.rooms > 50000'
};

var housingRooms = {
  'any': 0,
  '1': 1,
  '2': 2,
  '3': 3
};

var housingGuests = {
  'any': 0,
  '1': 1,
  '2': 2
};

function filterallSelects() {
  window.similarAds.filter(function (ad) {
    return ad.offer.type === housingTypeSelect.value;
  }).filter(function (ad) {
    return ad.offer.rooms === housingRooms[housingRoomsSelect.value];
  }).filter(function (ad) {
    return ad.offer.guests === housingGuests[housingGuestsSelect.value];
  });
}


window.similarAds.filter(function () {
  return housingPrice[housingPriceSelect.value];
});

