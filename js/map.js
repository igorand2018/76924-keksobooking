'use strict';

window.map = (function () {
  var map = document.querySelector('.map');
  var startPin = map.querySelector('.map__pins .map__pin:first-of-type');
  var TOP_OFFSET = 150;
  var LEFT_OFFSET = 0;
  var BOTTOM_OFFSET = 500;

  function activateApp() {
    window.formValidation.adForm.classList.remove('ad-form--disabled');
    map.classList.remove('map--faded');
    for (var s = 0; s < window.formValidation.adFormFieldSet.length; s++) {
      window.formValidation.adFormFieldSet[s].removeAttribute('disabled');
    }
    window.pin.enableMapFilters();
  }

  function onStartPinClick(evt) {
    evt.preventDefault();
    activateApp();
    window.backend.load(window.pin.getPins, onErrorMessage);
    startPin.removeEventListener('mouseup', onStartPinClick);
  }

  function onErrorMessage(errorMessage) {
    var errorBlock = document.createElement('div');
    errorBlock.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: #ffaa99;';
    errorBlock.style.position = 'absolute';
    errorBlock.style.left = 0;
    errorBlock.style.right = 0;
    errorBlock.style.fontSize = '25px';

    errorBlock.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorBlock);
  }


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
        window.card.renderCard(window.pin.filteredArray[currentPinIndex]);
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

    function onMouseMove(moveEvt) {
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
        top: TOP_OFFSET - window.pin.PIN_HEIGHT,
        right: map.offsetWidth - startPin.offsetWidth,
        bottom: BOTTOM_OFFSET - window.pin.PIN_HEIGHT,
        left: LEFT_OFFSET
      };

      var newCoord = {
        x: limits.left,
        y: limits.top
      };

      if (currentX > limits.right) {
        newCoord.x = limits.right;
      } else if (currentX > limits.left) {
        newCoord.x = currentX;
      }

      if (currentY > limits.bottom) {
        newCoord.y = limits.bottom;
      } else if (currentY > limits.top) {
        newCoord.y = currentY;
      }

      startPin.style.top = newCoord.y + 'px';
      startPin.style.left = newCoord.x + 'px';

      window.formValidation.formAdressInput.value = currentX + Math.ceil(window.pin.PIN_WINDTH / 2) + ', ' + (currentY + window.pin.PIN_HEIGHT);
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });
  return {
    map: map,
    startPin: startPin,
    onStartPinClick: onStartPinClick
  };

})();
