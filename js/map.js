'use strict';

var ADS = 8;
var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_CHECK = ['12:00', '13:00', '14:00'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PIN_HEIGTH = 77;
var PIN_WINDTH = 65;

function getRandomArrayElement(array) {
  var randomElement = array[Math.floor(Math.random() * array.length)];
  return randomElement;
} // Генерация случайного элемента массива

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
} // Генерация случайного числа от min до max

// function shuffle(array) {
//   var currentIndex = array.length, temporaryValue, randomIndex;

//   // While there remain elements to shuffle...
//   while (0 !== currentIndex) {

//     // Pick a remaining element...
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex -= 1;

//     // And swap it with the current element.
//     temporaryValue = array[currentIndex];
//     array[currentIndex] = array[randomIndex];
//     array[randomIndex] = temporaryValue;
//   }

//   return array;
// }

function getCuttedArrayElement() {

  for (var i = 0; i < OFFER_TITLES.length; i++) {
    var CuttedElement = OFFER_TITLES.splice(getRandomInt(0, OFFER_TITLES.length - 2), 1);
    CuttedElement = String(CuttedElement);
    return CuttedElement;

  }

}

function compareRand() {
  return Math.random() * 2 - 1;
}// for sort

var similarAds = [];

for (var i = 0; i <= ADS - 1; i++) {
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
// PHOTOS.sort(() => Math.random() * 2 - 1)
// Шаг 2
var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mapPin = document.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');// Контейнер

// Создаём пин
function renderPin() {
  var newPin = mapPin.cloneNode(true);
  newPin.style.top = currentElement.location.x - PIN_HEIGTH + 'px';
  newPin.style.left = currentElement.location.y - (PIN_WINDTH / 2) + 'px';
  newPin.querySelector('img').src = currentElement.author.avatar;
  newPin.querySelector('img').alt = currentElement.offer.title;
  return newPin;
}
// Создаём фрагмент
var fragment = document.createDocumentFragment();
for(i = 0; i <= ADS - 1; i++) {
  fragment.appendChild(renderPin());
}

mapPins.appendChild(fragment);
