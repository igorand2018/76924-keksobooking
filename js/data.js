'use strict';
window.appData = (function () {

  var ADS = 8;
  var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var OFFER_CHECK = ['12:00', '13:00', '14:00'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];


  function getRandomArrayElement(array) {
    var randomElement = array[Math.floor(Math.random() * array.length)];
    return randomElement;
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function getCuttedArrayElement() {
    return OFFER_TITLES.splice(getRandomInt(0, OFFER_TITLES.length - 2), 1);
  }

  function compareRand() {
    return Math.random() * 2 - 1;
  }

  var similarAds = [];

  for (var i = 0; i < ADS; i++) {
    var currentElement = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      location: {
        x: getRandomInt(300, 900),
        y: getRandomInt(150, 500),
      },
      offer: {
        title: getCuttedArrayElement(),
        address: '',
        price: getRandomInt(1000, 1000000),
        type: getRandomArrayElement(OFFER_TYPES),
        rooms: getRandomInt(1, 5),
        guests: getRandomInt(0, 3),
        checkin: getRandomArrayElement(OFFER_CHECK),
        checkout: getRandomArrayElement(OFFER_CHECK),
        features: FEATURES.splice(getRandomInt(1, FEATURES.length - 1), getRandomInt(0, FEATURES.length)),
        description: ' ',
        photos: PHOTOS.sort(compareRand),
      }

    };
    currentElement.offer.address = currentElement.location.x + ', ' + currentElement.location.y;
    similarAds.push(currentElement);

  }
  return {
    ADS: ADS,
    similarAds: similarAds,
  };

})();


