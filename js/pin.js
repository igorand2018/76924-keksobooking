'use strict';

window.pin = (function () {
  var PIN_HEIGHT = 87;
  var PIN_WINDTH = 65;
  var mapFiltersForm = document.querySelector('.map__filters');
  var housingTypeSelect = document.querySelector('#housing-type');
  var housingPriceSelect = document.querySelector('#housing-price');
  var housingRoomsSelect = document.querySelector('#housing-rooms');
  var housingCapacitySelect = document.querySelector('#housing-guests');
  var MAX_PINS = 5;
  var filterWifi = mapFiltersForm.querySelector('#filter-wifi');
  var filterDishwasher = mapFiltersForm.querySelector('#filter-dishwasher');
  var filterParking = mapFiltersForm.querySelector('#filter-parking');
  var filterWasher = mapFiltersForm.querySelector('#filter-washer');
  var filterElevator = mapFiltersForm.querySelector('#filter-elevator');
  var filterConditioner = mapFiltersForm.querySelector('#filter-conditioner');

  var mapPin = document.querySelector('template')
      .content
      .querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');
  var pinsFragment = document.createDocumentFragment();

  mapFiltersForm.addEventListener('change', function () {
    window.pin.filterallSelects();
    // window.pin.getPins(window.pin.filterallSelects());
  });

  return {
    getPins: function (offersArray) {
      for (var i = 0; i < MAX_PINS; i++) {
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
            return (window.pin.housingTypeSelect.value === 'any' && ad.offer.type === 'flat'
            && ad.offer.type === 'house' && ad.offer.type === 'bungalo') ||
            (window.pin.housingTypeSelect.value === 'flat' && ad.offer.type === 'flat') ||
            (window.pin.housingTypeSelect.value === 'house' && ad.offer.type === 'house') ||
            (window.pin.housingTypeSelect.value === 'bungalo' && ad.offer.type === 'bungalo');
          }).
          filter(function (ad) {
            return (window.pin.housingPriceSelect.value === 'any' && ad.offer.price >= 0) ||
                (window.pin.housingPriceSelect.value === 'low' && ad.offer.price >= 10000) ||
                (window.pin.housingPriceSelect.value === 'high' && ad.offer.price >= 50000) ||
                (window.pin.housingPriceSelect.value === 'middle' && (ad.offer.price >= 10000 && ad.offer.price <= 50000));
          }).
          filter(function (ad) {
            return (window.pin.housingRoomsSelect.value === 'any' && ad.offer.rooms > 0) ||
                (window.pin.housingRoomsSelect.value === '1' && ad.offer.rooms === 1) ||
                (window.pin.housingRoomsSelect.value === '2' && ad.offer.rooms === 2) ||
                (window.pin.housingRoomsSelect.value === '3' && ad.offer.rooms === 3);
          }).
          filter(function (ad) {
            return (window.pin.housingCapacitySelect.value === 'any' && ad.offer.guests > 0) ||
                (window.pin.housingCapacitySelect.value === '1' && ad.offer.guests === 1) ||
                (window.pin.housingCapacitySelect.value === '2' && ad.offer.guests === 2);
          }).
          filter(function (ad) {
            return (window.pin.filterWifi.checked && ad.offer.features.indexOf('wifi')) ||
                (window.pin.filterDishwasher.checked && ad.offer.features.indexOf('dishwasher')) ||
                (window.pin.filterParking.checked && ad.offer.features.indexOf('parking')) ||
                (window.pin.filterWasher.checked && ad.offer.features.indexOf('washer')) ||
                (window.pin.filterElevator.checked && ad.offer.features.indexOf('elevator')) ||
                (window.pin.filterConditioner.checked && ad.offer.features.indexOf('conditioner'));
          });

      return filteredArray;
    },
    mapPins: mapPins,
    PIN_HEIGHT: PIN_HEIGHT,
    PIN_WINDTH: PIN_WINDTH,
    housingTypeSelect: housingTypeSelect,
    housingPriceSelect: housingPriceSelect,
    housingRoomsSelect: housingRoomsSelect,
    housingCapacitySelect: housingCapacitySelect,
    filterWifi: filterWifi,
    filterDishwasher: filterDishwasher,
    filterParking: filterParking,
    filterWasher: filterWasher,
    filterElevator: filterElevator,
    filterConditioner: filterConditioner

  };
})();

