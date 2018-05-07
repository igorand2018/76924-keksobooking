'use strict';

window.card = (function () {
  var mapCard = document.querySelector('template')
      .content
      .querySelector('.map__card');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var ESC_KEYCODE = 27;

  var featuresFragment = document.createDocumentFragment();

  function getOfferFeatures(arrayElement) {
    for (var i = 0; i < arrayElement.offer.features.length; i++) {
      var feature = document.createElement('li');
      var popupFeatureCustom = 'popup__feature--' + arrayElement.offer.features[i];
      feature.classList.add('popup__feature', popupFeatureCustom);

      featuresFragment.appendChild(feature);
    }
    return featuresFragment;
  }

  var photoFragment = document.createDocumentFragment();

  function getofferPhotos(arrayElement) {
    for (var i = 0; i < arrayElement.offer.photos.length; i++) {
      var photo = document.createElement('img');
      photo.width = 45;
      photo.height = 40;
      photo.classList.add('popup__photo');
      photo.src = arrayElement.offer.photos[i];
      photoFragment.appendChild(photo);
    }
    return photoFragment;
  }
  return {
    renderCard: function (arrayElement) {
      var newCard = mapCard.cloneNode(true);
      newCard.querySelector('.popup__title').textContent = arrayElement.offer.title;
      newCard.querySelector('.popup__text--address').textContent = arrayElement.offer.address;
      newCard.querySelector('.popup__text--price').textContent = arrayElement.offer.price + '₽/ночь';
      newCard.querySelector('.popup__type').textContent = arrayElement.offer.type;
      newCard.querySelector('.popup__text--capacity').textContent = arrayElement.offer.rooms + ' комнаты для ' + arrayElement.offer.guests + ' гостей';
      newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + arrayElement.offer.checkin + ', выезд до ' + arrayElement.offer.checkout;
      newCard.querySelector('.popup__features').innerHTML = '';
      newCard.querySelector('.popup__features').appendChild(getOfferFeatures(arrayElement));
      newCard.querySelector('.popup__description').textContent = arrayElement.offer.description;
      newCard.querySelector('.popup__photos').innerHTML = '';
      newCard.querySelector('.popup__photos').appendChild(getofferPhotos(arrayElement));
      newCard.querySelector('.popup__avatar').src = arrayElement.author.avatar;
      window.map.map.insertBefore(newCard, mapFiltersContainer);
      newCard.querySelector('.popup__close').addEventListener('click', function () {
        window.map.map.removeChild(newCard);
      });
      function closePopup() {
        window.map.map.removeChild(newCard);
        document.removeEventListener('keydown', onPopupEscPress);
      }
      function onPopupEscPress(evt) {
        if (evt.keyCode === ESC_KEYCODE) {
          closePopup();
        }
      }

      document.addEventListener('keydown', onPopupEscPress);
    },
    mapFiltersContainer: mapFiltersContainer
  };

})();
