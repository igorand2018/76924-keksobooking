'use strict';

var ADS = 8;
var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_CHECK = ['12:00', '13:00', '14:00'];

function getRandomArrayElement(array) {
  var randomElement = array[Math.floor(Math.random() * array.length)];
  return randomElement;
} // Генерация случайного элемента массива

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
} // Генерация случайного числа от min до max

// var randomAvatarUrls = [];

function getRandomAvatarUrl(min, max) {
  var n = Math.floor(Math.random() * (max - min)) + min; // берем случайное число из диапозона
  var nN = '0' + n; // Преобразуем в число с ведущим нулём
  // Проверяем, использовалось ли это число ранее
  var NnN = 'img/avatars/user' + nN + '.png'; // Составляем строку
  return NnN;
}
// function getLocationString() {
//   var xString = String(similarAds[i].location.x);
//   var yString = String(similarAds[i].location.y);
//   return xString + ', ' + yString;
// };

var similarAds = [];

for (var i = 1; i <= ADS; i++) {
  similarAds[i] = {
    author: {
      avatar: getRandomAvatarUrl(1, ADS)
    },
    location: {
      x: getRandomInt(300, 900),
      y: getRandomInt(150, 500),
    },
    offer: {
      title: getRandomArrayElement(OFFER_TITLES),
      address: 'similarAds[i].location.x',
      price: getRandomInt(1000, 1000000),
      type: getRandomArrayElement(OFFER_TYPES),
      rooms: getRandomInt(1, 5),
      guests: getRandomInt(1, 10),
      checkin: getRandomArrayElement(OFFER_CHECK),
      checkout: getRandomArrayElement(OFFER_CHECK),
      features: 'массив строк случайной длины',
      description: ' ',
      photos: 'string',
    }

  };
  similarAds.push(similarAds[i]);
}


// Шаг 2
var map = document.querySelector('.map');
map.classList.remove('map--faded');

// Дополнительно
var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarAdTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
// Шаг 3: На основе данных, созданных в первом пункте, создайте DOM-элементы, соответствующие меткам на карте, и заполните их данными из массива
// Итоговую разметку метки .map__pin можно взять из шаблона .map__card.
function renderAd(Ad) {
  var adElement = similarAdTemplate.cloneNode(true);

  adElement.querySelector('.setup-similar-label').textContent = wizard.name;

  adElement.querySelector('.setup-similar-label').textContent = wizard.name;
  adElement.querySelector('.setup-similar-label').textContent = wizard.name;

  adElement.querySelector('.setup-similar-label').textContent = wizard.name;
  adElement.querySelector('.setup-similar-label').textContent = wizard.name;
  adElement.querySelector('.setup-similar-label').textContent = wizard.name;
  adElement.querySelector('.setup-similar-label').textContent = wizard.name;
  adElement.querySelector('.setup-similar-label').textContent = wizard.name;
  adElement.querySelector('.setup-similar-label').textContent = wizard.name;

  adElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  adElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
}

// Шаг 4: Отрисуйте сгенерированные DOM-элементы в блок .map__pins. Для вставки элементов используйте DocumentFragment.

var fragment = document.createDocumentFragment();
for (var i = 0; i < similarAds.length; i++) {
  fragment.appendChild(renderAd(similarAds[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
