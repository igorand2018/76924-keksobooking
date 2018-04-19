'use strict';

var ADS = 8;
var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_CHECK = ['12:00', '13:00', '14:00'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

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
    var CuttedElement = OFFER_TITLES.splice(getRandomInt(0, OFFER_TITLES.length-2), 1);
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
      avatar: 'img/avatars/user0' + (i+1) + '.png'
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
      features: FEATURES.splice(getRandomInt(1, FEATURES.length-1), getRandomInt(0, FEATURES.length)),
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

// Создаём пин
function createPin() {
  for (var i = 0; i <= ADS-1; i++) {
    var Pin = document.createElement('button');
    var PinPic = document.createElement('img');
    Pin.classList.add('map__pin');
    Pin.style.top = similarAds[i].location.x + 'px';
    Pin.style.left = similarAds[i].location.y + 'px';
    PinPic.src = similarAds[i].author.avatar;
    PinPic.alt = 'Некрасивый негостеприимный домик';
    Pin.appendChild(PinPic);
    map.appendChild(Pin);
  }

}


// // Создадим элемент и добавим его в DOM-дерево:
// var newBlock = document.createElement('div'); //Элемент создан
// newBlock.classList.add('container','container-7','red', 'border-radiused'); // Элементу присвоено несколько классов
// flexContainer.appendChild(newBlock); // Добавили элемент в конец родительского элемента
// newBlock.textContent = '777'; // Добавили текстовое содержимое в новый блок(можно читать свойство, записывать, перезаписывать)

// var AdPin = document.querySelector('.map__pin'); // Создали переменную - записали в нее элемент


// function renderPin(Pin){
//   var adElement = similarAdTemplate.cloneNode(true);

// }
// var Pin = document.querySelector('.map__pin');
// function getPin() {
//   var newPin = Pin.cloneNode(true);
//   newPin.querySelector('.map__pin').style= 'left:150 px; top: 200px';
//   map.appendChild(newPin);

// }

// // Дополнительно
// var similarListElement = userDialog.querySelector('.setup-similar-list');

// var similarAdTemplate = document.querySelector('#similar-ad-template')
//     .content
//     .querySelector('.setup-similar-item');

// Шаг 3: На основе данных, созданных в первом пункте, создайте DOM-элементы, соответствующие меткам на карте, и заполните их данными из массива
// Итоговую разметку метки .map__pin можно взять из шаблона .map__card.
// function renderAd(Ad) {
//   var adElement = similarAdTemplate.cloneNode(true);

//   adElement.querySelector('.setup-similar-label').textContent = wizard.name;

//   adElement.querySelector('.setup-similar-label').textContent = wizard.name;
//   adElement.querySelector('.setup-similar-label').textContent = wizard.name;

//   adElement.querySelector('.setup-similar-label').textContent = wizard.name;
//   adElement.querySelector('.setup-similar-label').textContent = wizard.name;
//   adElement.querySelector('.setup-similar-label').textContent = wizard.name;
//   adElement.querySelector('.setup-similar-label').textContent = wizard.name;
//   adElement.querySelector('.setup-similar-label').textContent = wizard.name;
//   adElement.querySelector('.setup-similar-label').textContent = wizard.name;

//   adElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
//   adElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

//   return wizardElement;
// }

// // Шаг 4: Отрисуйте сгенерированные DOM-элементы в блок .map__pins. Для вставки элементов используйте DocumentFragment.

// var fragment = document.createDocumentFragment();
// for (var i = 0; i < similarAds.length; i++) {
//   fragment.appendChild(renderAd(similarAds[i]));
// }
// similarListElement.appendChild(fragment);

// userDialog.querySelector('.setup-similar').classList.remove('hidden');
