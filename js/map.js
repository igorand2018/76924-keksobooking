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
  if (previousCard) {
    map.removeChild(previousCard);
  }
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

var inputTitle = adForm.querySelector('#title');

var typeSelect = adForm.querySelector('#type');
var inputPrice = adForm.querySelector('#price');

var timeinSelection = adForm.querySelector('#timein');
var timeoutSelection = adForm.querySelector('#timeout');

var roomNumberSelect = adForm.querySelector('#room_number');
var capacitySelect = adForm.querySelector('#capacity');

var formInputs = adForm.querySelectorAll('input');
var formSelects = adForm.querySelectorAll('select');

var submitButton = adForm.querySelector('.ad-form__submit');
var resetButton = adForm.querySelector('.ad-form__reset');

function markValid(inputName) {
  inputName.style.border = '1px solid #d9d9d3';
}
function markInvalid(inputName) {
  inputName.style.border = '1px solid red';
}

inputTitle.addEventListener('invalid', function () {
  if (inputTitle.validity.tooShort) {
    inputTitle.setCustomValidity('Минимальная длина заголовка — 30 символов');
    markInvalid(inputTitle);
  } else if (inputTitle.validity.valueMissing) {
    inputTitle.setCustomValidity('Обязательное поле');
    markInvalid(inputTitle);
  } else {
    inputPrice.setCustomValidity('');
    markValid(inputTitle);
  }

});

inputTitle.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    inputTitle.setCustomValidity('Минимальная длина заголовка — 30 символов');
    markInvalid(inputTitle);
  } else if (target.value.length > 30) {
    inputTitle.setCustomValidity('');
    markValid(inputTitle);
  }
});

inputPrice.addEventListener('invalid', function () {

  if (inputPrice.validity.valueMissing) {
    inputPrice.setCustomValidity('Обязательное поле');
    markInvalid(inputPrice);
  } else {
    inputPrice.setCustomValidity('');
    markValid(inputPrice);
  }

  if (inputPrice.validity.length.tooShort) {
    markInvalid(inputPrice);
  } else {
    markValid(inputPrice);
    inputPrice.setCustomValidity('');
  }

});

inputPrice.addEventListener('input', function () {
  if (inputPrice.value < inputPrice.min) {
    inputPrice.setCustomValidity('');
    markValid(inputPrice);
  } else if (inputPrice.value >= inputPrice.min) {
    inputPrice.setCustomValidity('Значение меньше требуемого');
    markInvalid(inputPrice);
  }

});

timeinSelection.addEventListener('change', function () {
  timeoutSelection.value = timeinSelection.value;
});

timeoutSelection.addEventListener('change', function () {
  timeinSelection.value = timeoutSelection.value;
});

var typeToPrice = {
  'bungalo': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000,
};

typeSelect.addEventListener('change', function (evt) {
  var target = evt.target;

  if (target.value === 'flat') {
    inputPrice.min = typeToPrice.flat;
    inputPrice.placeholder = 'от ' + typeToPrice.flat + ' рублей';
    inputPrice.setCustomValidity('Минимальная цена - 1000');
  } else if (target.value === 'house') {
    inputPrice.min = typeToPrice.house;
    inputPrice.placeholder = 'от ' + typeToPrice.house + ' рублей';
    inputPrice.setCustomValidity('Минимальная цена - 5000');
  } else if (target.value === 'palace') {
    inputPrice.min = typeToPrice.palace;
    inputPrice.placeholder = 'от ' + typeToPrice.palace + ' рублей';
    inputPrice.setCustomValidity('Минимальная цена - 10000');
  } else if (target.value === 'bungalo') {
    inputPrice.min = typeToPrice.bungalo;
    inputPrice.placeholder = 'от ' + typeToPrice.bungalo + ' рублей';
    inputPrice.setCustomValidity('Минимальная цена - 0');
  } else {
    inputPrice.setCustomValidity('');
  }

});

function setCapacity() {
  var rooms = roomNumberSelect.value;
  var places = capacitySelect.value;

  if (rooms === '1' && places === '1') {
    markValid(capacitySelect);
    capacitySelect.setCustomValidity('');
  } else if (rooms === '1' && places !== '1') {
    capacitySelect.setCustomValidity('Подоходит для 1 гостя');
    markInvalid(capacitySelect);
  }

  if (rooms === '2' && places === '1' || places === '2') {
    markValid(capacitySelect);
    capacitySelect.setCustomValidity('');
  } else {
    capacitySelect.setCustomValidity('Подоходит для 1 или 2 гостей');
    markInvalid(capacitySelect);
  }
  if (rooms === '3' && places === '1' || places === '2' || places === '3') {
    markValid(capacitySelect);
    capacitySelect.setCustomValidity('');
  } else {
    capacitySelect.setCustomValidity('Подоходит для 1 или 2 гостей');
    markInvalid(capacitySelect);
  }
  if (rooms === '100' && places === '0') {
    markValid(capacitySelect);
    capacitySelect.setCustomValidity('');
  } else {
    capacitySelect.setCustomValidity('Подоходит для 1 или 2 гостей');
    markInvalid(capacitySelect);
  }
}

roomNumberSelect.addEventListener('invalid', function () {
  setCapacity();
});

function checkFormElementsValidity(Elements) {
  for (i = 0; i < Elements.length; i++) {
    if (Elements[i].validity.valid === false) {
      markInvalid(Elements);
    }
  }
}

submitButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  checkFormElementsValidity(formInputs);
  checkFormElementsValidity(formSelects);

  if (adForm.checkValidity() === true) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
});

resetButton.addEventListener('click', function () {
  adForm.reset();
});
