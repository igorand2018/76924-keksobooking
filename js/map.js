'use strict';

window.map = (function () {
  var map = document.querySelector('.map');
  var startPin = document.querySelector('.map__pins .map__pin:first-of-type');
  var TOP_OFFSET = 150;
  var LEFT_OFFSET = 0;
  var BOTTOM_OFFSET = 500;

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
    window.load(window.pin.getPins, errorHandler);
  }

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
        window.card.renderCard(window.similarAds[currentPinIndex]);
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
        top: map.offsetTop + TOP_OFFSET - startPin.offsetHeight,
        right: map.offsetWidth - startPin.offsetWidth,
        bottom: BOTTOM_OFFSET - window.pin.PIN_HEIGHT,
        left: LEFT_OFFSET
      };

      var NEW_COORD = {
        x: limits.left,
        y: limits.top
      };

      if (currentX > limits.right) {
        NEW_COORD.x = limits.right;
      } else if (currentX > limits.left) {
        NEW_COORD.x = currentX;
      }

      if (currentY > limits.bottom) {
        NEW_COORD.y = limits.bottom;
      } else if (currentY > limits.top) {
        NEW_COORD.y = currentY;
      }

      startPin.style.top = NEW_COORD.y + 'px';
      startPin.style.left = NEW_COORD.x + 'px';

      window.formValidation.formAdressInput.value = currentX + Math.ceil(window.pin.PIN_WINDTH / 2) + ', ' + (currentY + window.pin.PIN_HEIGHT);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });
  return {
    map: map,
    startPin: startPin
  };

})();
