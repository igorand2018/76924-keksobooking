'use strict';

window.pin = (function () {
  var PIN_HEIGHT = 87;
  var PIN_WINDTH = 65;
  var MAX_PINS = 5;
  var mapFiltersForm = document.querySelector('.map__filters');
  var mapFiltersFormFieldSet = mapFiltersForm.getElementsByTagName('fieldset');
  var mapFiltersFormSelects = mapFiltersForm.getElementsByTagName('select');
  var housingTypeSelect = document.querySelector('#housing-type');
  var housingPriceSelect = document.querySelector('#housing-price');
  var housingRoomsSelect = document.querySelector('#housing-rooms');
  var housingCapacitySelect = document.querySelector('#housing-guests');
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

  function disableMapFilters() {
    for (var s = 0; s < mapFiltersFormFieldSet.length; s++) {
      mapFiltersFormFieldSet[s].setAttribute('disabled', 'disabled');
    }
    for (s = 0; s < mapFiltersFormSelects.length; s++) {
      mapFiltersFormSelects[s].setAttribute('disabled', 'disabled');
    }
  }

  function enableMapFilters() {
    for (var s = 0; s < mapFiltersFormFieldSet.length; s++) {
      mapFiltersFormFieldSet[s].removeAttribute('disabled', 'disabled');
    }
    for (s = 0; s < mapFiltersFormSelects.length; s++) {
      mapFiltersFormSelects[s].removeAttribute('disabled', 'disabled');
    }
  }

  disableMapFilters();

  function onChange() {
    window.pin.filterallSelects();
    if (window.pin.mapPins.querySelectorAll('.map__pin').length > 1) {
      window.pin.removePins();
      window.pin.getPins(window.pin.filteredArray);
    } else {
      window.pin.getPins(window.pin.filteredArray);
    }
    window.card.closePopup();

  }

  mapFiltersForm.addEventListener('change', window.debounce(onChange));

  return {
    getPins: function (offersArray) {
      var lengthLimit = (offersArray.length > MAX_PINS) ? MAX_PINS : offersArray.length;
      for (var i = 0; i < lengthLimit; i++) {
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
            switch (window.pin.housingTypeSelect.value) {
              case 'any': return true;
              default: return window.pin.housingTypeSelect.value === ad.offer.type;
            }
          }).
          filter(function (ad) {
            return (window.pin.housingPriceSelect.value === 'any' && ad.offer.price >= 0) ||
                (window.pin.housingPriceSelect.value === 'low' && ad.offer.price <= 10000) ||
                (window.pin.housingPriceSelect.value === 'high' && ad.offer.price >= 50000) ||
                (window.pin.housingPriceSelect.value === 'middle' && (ad.offer.price >= 10000 && ad.offer.price <= 50000));
          }).
          filter(function (ad) {
            return (window.pin.housingRoomsSelect.value === 'any' && ad.offer.rooms >= 0) ||
                (window.pin.housingRoomsSelect.value === '1' && ad.offer.rooms === 1) ||
                (window.pin.housingRoomsSelect.value === '2' && ad.offer.rooms === 2) ||
                (window.pin.housingRoomsSelect.value === '3' && ad.offer.rooms === 3);
          }).
          filter(function (ad) {
            return (window.pin.housingCapacitySelect.value === 'any' && ad.offer.guests >= 0) ||
                (window.pin.housingCapacitySelect.value === '1' && ad.offer.guests === 1) ||
                (window.pin.housingCapacitySelect.value === '2' && ad.offer.guests === 2);
          }).
          filter(function (ad) {

            var checked = document.querySelectorAll('input[type="checkbox"]:checked');

            for (var i = 0; i < checked.length; i++) {
              var element = checked[i];
              if (ad.offer.features.indexOf(element.value) === -1) {
                return false;
              }
            }
            return true;
          });
      window.pin.filteredArray = filteredArray;
      return filteredArray;
    },
    mapPins: mapPins,
    PIN_HEIGHT: PIN_HEIGHT,
    PIN_WINDTH: PIN_WINDTH,
    mapFiltersForm: mapFiltersForm,
    housingTypeSelect: housingTypeSelect,
    housingPriceSelect: housingPriceSelect,
    housingRoomsSelect: housingRoomsSelect,
    housingCapacitySelect: housingCapacitySelect,
    filterWifi: filterWifi,
    filterDishwasher: filterDishwasher,
    filterParking: filterParking,
    filterWasher: filterWasher,
    filterElevator: filterElevator,
    filterConditioner: filterConditioner,
    disableMapFilters: disableMapFilters,
    enableMapFilters: enableMapFilters
  };
})();

