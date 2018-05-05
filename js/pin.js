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
    // updatePins: function () {

    // },
    allMapPins: allMapPins,
    mapPins: mapPins,
    PIN_HEIGTH: PIN_HEIGTH,
    PIN_WINDTH: PIN_WINDTH
  };
})();

var housingTypeSelect = document.querySelector('#housing-type');
var housingPriceSelect = document.querySelector('#housing-price');
// var housingRoomsSelect = document.querySelector('#housing-rooms');
// var housingGuestsSelect = document.querySelector('#housing-guests');

housingTypeSelect.addEventListener('change', function (evt) {
  var selectValue = evt.target.value;
  if (selectValue === 'flat') {
    var oldPins = window.pin.mapPins.querySelectorAll('.map__pin');
    for (var i = oldPins.lenght - 1; i >= 0; i--) {
      window.pin.mapPins.removeChild(oldPins[i]);
    }
    var newArray = window.similarAds.filter(function (ad) {
      return ad.offer.type === 'flat';
    });
    window.pin.getPins(newArray);
  }
});

housingPriceSelect.addEventListener('change', function (evt) {
  var selectValue = evt.target.value;

  if (selectValue === 'any') {

    var newArray = window.similarAds.filter(function (ad) {
      return ad.offer.price > 0;
    });
    window.pin.getPins(newArray);

  } else if (selectValue === 'middle') {

    newArray = window.similarAds.filter(function (ad) {
      return ad.offer.price > 0;
    });
    window.pin.getPins(newArray);

  } else if (selectValue === 'low') {

    newArray = window.similarAds.filter(function (ad) {
      return ad.offer.price < 10000;
    });
    window.pin.getPins(newArray);

  } else if (selectValue === 'high') {

    newArray = window.similarAds.filter(function (ad) {
      return ad.offer.price > 50000;
    });
    window.pin.getPins(newArray);
  }
});

// housingRoomsSelect.addEventListener('change', function (evt) {
//   var selectValue = evt.target.value;
//   alert(selectValue);
//   if (selectValue === 'any') {

//   } else if (selectValue === '1') {

//   } else if (selectValue === '2') {

//   }  else if (selectValue === '3') {

//   }

// });

// housingGuestsSelect.addEventListener('change', function (evt) {
//   var selectValue = evt.target.value;
//   alert(selectValue);
//   if (selectValue === 'any') {
//     var newArray = window.similarAds.filter(function (ad) {
//       return ad.offer.price > 50000;
//     });
//     window.pin.getPins(newArray);

//   } else if (selectValue === '1') {

//   } else if (selectValue === '2') {

//   }

// });
