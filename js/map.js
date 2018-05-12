'use strict';

window.map = (function () {
  var offersArea = document.querySelector('.map');
  var startPin = offersArea.querySelector('.map__pins .map__pin:first-of-type');
  var TOP_OFFSET = 150;
  var LEFT_OFFSET = 0;
  var BOTTOM_OFFSET = 500;

  function activateApp() {
    window.advert.applicationForm.classList.remove('ad-form--disabled');
    offersArea.classList.remove('map--faded');
    for (var s = 0; s < window.advert.applicationFormFieldSet.length; s++) {
      window.advert.applicationFormFieldSet[s].removeAttribute('disabled');
    }
    window.pin.enableMapFilters();
  }

  function onStartPinClick(evt) {
    evt.preventDefault();
    activateApp();
    window.backend.load(window.pin.getData, onErrorMessage);
    startPin.removeEventListener('mouseup', onStartPinClick);
  }

  function onErrorMessage(errorMessage) {
    var errorBlock = document.createElement('div');
    errorBlock.setAttribute('style', 'z-index: 100; margin: 0 auto; text-align: center; background-color: #ffaa99; position: absolute; left: 0; right: 0; fontsize: 25px;');
    errorBlock.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorBlock);
  }


  startPin.addEventListener('mouseup', onStartPinClick);

  function removePreviousCard() {
    var previousCard = document.querySelector('.popup');
    if (previousCard) {
      offersArea.removeChild(previousCard);
    }
  }

  window.pin.mapData.addEventListener('click', function (evt) {
    var target = evt.target;
    while (target !== window.pin.mapData) {
      if (target.matches('.map__pin') && target !== startPin) {
        var currentPinIndex = target.getAttribute('data-index-number');
        removePreviousCard();
        window.card.getOfferDescription(window.pin.filteredArray[currentPinIndex]);
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
        top: TOP_OFFSET - window.pin.HEIGHT,
        right: offersArea.offsetWidth - startPin.offsetWidth,
        bottom: BOTTOM_OFFSET - window.pin.HEIGHT,
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

      startPin.setAttribute('style', 'left: ' + newCoord.x + 'px; ' + 'top: ' + newCoord.y + 'px;');

      window.advert.formAdressInput.value = currentX + Math.ceil(window.pin.WIDTH / 2) + ', ' + (currentY + window.pin.HEIGHT);
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
    offersArea: offersArea,
    startPin: startPin,
    onStartPinClick: onStartPinClick
  };

})();
