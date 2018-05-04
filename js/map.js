'use strict';

window.map = (function () {
  var map = document.querySelector('.map');
  var startPin = document.querySelector('.map__pins .map__pin:first-of-type');
  function activateApp() {
    window.formValidation.adForm.classList.remove('ad-form--disabled');
    map.classList.remove('map--faded');
    for (var s = 0; s < window.formValidation.adFormFieldSet.length; s++) {
      window.formValidation.adFormFieldSet[s].removeAttribute('disabled');
    }
  }

  function onStartPinClick(evt) {
    evt.preventDefault();
    activateApp();
    window.load(window.pin.getPins(), errorHandler);
  }
  // Error handler
  var errorHandler = function (errorMessage) {
    var errorBlock = document.createElement('div');
    errorBlock.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: #ffaa99;';
    errorBlock.style.position = 'absolute';
    errorBlock.style.left = 0;
    errorBlock.style.right = 0;
    errorBlock.style.fontSize = '25px';

    errorBlock.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorBlock);
  };
  // End of Error handler

  startPin.addEventListener('mouseup', onStartPinClick);

  function removePreviousCard() {
    var previousCard = document.querySelector('.popup');
    if (previousCard) {
      map.removeChild(previousCard);
    }
  }

  window.pin.mapPins.addEventListener('click', function (evt) {
    var target = evt.target;
    while (target !== window.pin.mapPins) {
      if (target.matches('.map__pin') && target !== startPin) {
        var currentPinIndex = target.getAttribute('data-index-number');
        removePreviousCard();
        window.card.renderCard(window.appData.similarAds[currentPinIndex]);
        break;
      }
      target = target.parentElement;
    }
  });

  startPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var currentY = (startPin.offsetTop - shift.y);
      var currentX = (startPin.offsetLeft - shift.x);

      var limits = {
        top: map.offsetTop,
        right: map.offsetWidth - startPin.offsetWidth,
        bottom: map.offsetHeight + map.offsetTop - startPin.offsetHeight - window.card.mapFiltersContainer.offsetHeight - 22,
        left: 0
      };

      var newLocation = {
        x: limits.left,
        y: limits.top
      };

      if (currentX > limits.right) {
        newLocation.x = limits.right;
      } else if (currentX > limits.left) {
        newLocation.x = currentX;
      }

      if (currentY > limits.bottom) {
        newLocation.y = limits.bottom;
      } else if (currentY > limits.top) {
        newLocation.y = currentY;
      }

      startPin.style.top = newLocation.y + 'px';
      startPin.style.left = newLocation.x + 'px';

      window.formValidation.formAdressInput.value = ((startPin.offsetTop - shift.y) + window.pin.PIN_HEIGTH) + ', ' + Math.floor((startPin.offsetLeft - shift.x) + window.pin.PIN_WINDTH / 2);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });
  // load on backend.js

  // load on backend.js
  return {
    map: map,
    startPin: startPin
  };

})();
