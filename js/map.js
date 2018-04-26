'use strict';

var ADS = 8;
var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_CHECK = ['12:00', '13:00', '14:00'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PIN_HEIGTH = 87;
var PIN_WINDTH = 65;

function getRandomArrayElement(array) {
  var randomElement = array[Math.floor(Math.random() * array.length)];
  return randomElement;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getCuttedArrayElement() {
  for (var i = 0; i < OFFER_TITLES.length; i++) {
    var CuttedElement = OFFER_TITLES.splice(getRandomInt(0, OFFER_TITLES.length - 2), 1);
    CuttedElement = String(CuttedElement);
  }
  return CuttedElement;
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

var map = document.querySelector('.map');

var mapPin = document.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');

var pinsFragment = document.createDocumentFragment();
function getPins() {
  for (i = 0; i < ADS; i++) {
    var newPin = mapPin.cloneNode(true);
    newPin.style.top = similarAds[i].location.y - PIN_HEIGTH + 'px';
    newPin.style.left = similarAds[i].location.x - (PIN_WINDTH / 2) + 'px';
    newPin.querySelector('img').src = similarAds[i].author.avatar;
    newPin.querySelector('img').alt = similarAds[i].offer.title;
    newPin.dataset.indexNumber = [i];
    pinsFragment.appendChild(newPin);

  }
  mapPins.appendChild(pinsFragment);
}

var mapCard = document.querySelector('template')
    .content
    .querySelector('.map__card');
var mapFiltersContainer = document.querySelector('.map__filters-container');

var featuresFragment = document.createDocumentFragment();

function getOfferFeatures() {
  for (i = 0; i < similarAds[0].offer.features.length; i++) {
    var feature = document.createElement('li');
    var popupFeatureCustom = 'popup__feature--' + similarAds[0].offer.features[i];
    feature.classList.add('popup__feature', popupFeatureCustom);

    featuresFragment.appendChild(feature);
  }
  return featuresFragment;
}


var photoFragment = document.createDocumentFragment();

function getofferPhotos() {
  for (i = 0; i < similarAds[0].offer.photos.length; i++) {
    var photo = document.createElement('img');
    photo.width = 45;
    photo.height = 40;
    photo.classList.add('popup__photo');
    photo.src = similarAds[0].offer.photos[i];
    photoFragment.appendChild(photo);
  }
  return photoFragment;
}
var ESC_KEYCODE = 27;

function renderCard(arrayElement) {
  var newCard = mapCard.cloneNode(true);
  newCard.querySelector('.popup__title').textContent = arrayElement.offer.title;
  newCard.querySelector('.popup__text--address').textContent = arrayElement.offer.address;
  newCard.querySelector('.popup__text--price').textContent = arrayElement.offer.price + '₽/ночь';
  newCard.querySelector('.popup__type').textContent = arrayElement.offer.type;
  newCard.querySelector('.popup__text--capacity').textContent = arrayElement.offer.rooms + ' комнаты для ' + arrayElement.offer.guests + ' гостей';
  newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + arrayElement.offer.checkin + ', выезд до ' + arrayElement.offer.checkout;
  newCard.querySelector('.popup__features').innerHTML = '';
  newCard.querySelector('.popup__features').appendChild(getOfferFeatures());
  newCard.querySelector('.popup__description').textContent = arrayElement.offer.description;
  newCard.querySelector('.popup__photos').innerHTML = '';
  newCard.querySelector('.popup__photos').appendChild(getofferPhotos());
  newCard.querySelector('.popup__avatar').src = arrayElement.author.avatar;
  map.insertBefore(newCard, mapFiltersContainer);
  newCard.querySelector('.popup__close').addEventListener('click', function () {
    map.removeChild(newCard);
  });
  function closePopup() {
    map.removeChild(newCard);
    document.removeEventListener('keydown', onPopupEscPress);
  }
  function onPopupEscPress(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  }

  document.addEventListener('keydown', onPopupEscPress);
}

var adForm = document.querySelector('.ad-form');
var adFormFieldSet = document.querySelectorAll('.ad-form__element');

for (var s = 0; s < adFormFieldSet.length; s++) {
  adFormFieldSet[s].setAttribute('disabled', 'disabled');
}

function activateApp() {
  adForm.classList.remove('ad-form--disabled');
  map.classList.remove('map--faded');
  for (s = 0; s < adFormFieldSet.length; s++) {
    adFormFieldSet[s].removeAttribute('disabled');
  }
}

var formAdressInput = document.getElementById('address');

var startPosition = {
  location: {
    x: 570,
    y: 375
  }
};

function setAddress() {
  formAdressInput.value = (startPosition.location.x) + ', ' + Math.round(startPosition.location.y - (PIN_HEIGTH / 2));
}

var startPin = document.querySelector('.map__pins .map__pin');

startPin.addEventListener('mouseup', function () {
  activateApp();
  setAddress();
  getPins();
});

function removePreviousCard() {
  var previousCard = document.querySelector('.popup');
  map.removeChild(previousCard);
}

mapPins.addEventListener('click', function (evt) {
  var target = evt.target;
  while (target !== mapPins) {
    if (target.matches('.map__pin')) {
      var currentPinIndex = target.getAttribute('data-index-number');
      removePreviousCard();
      renderCard(similarAds[currentPinIndex]);
      break;
    }
    target = target.parentElement;
  }
});
