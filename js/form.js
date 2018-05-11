
'use strict';
window.advert = (function () {
  var applicationForm = document.querySelector('.ad-form');
  var applicationFormFieldSet = applicationForm.getElementsByTagName('fieldset');
  var inputTitle = applicationForm.querySelector('#title');
  var typeSelect = applicationForm.querySelector('#type');
  var inputPrice = applicationForm.querySelector('#price');
  var timeinSelection = applicationForm.querySelector('#timein');
  var timeoutSelection = applicationForm.querySelector('#timeout');
  var roomNumberSelect = applicationForm.querySelector('#room_number');
  var capacitySelect = applicationForm.querySelector('#capacity');
  var submitButton = applicationForm.querySelector('.ad-form__submit');
  var resetButton = applicationForm.querySelector('.ad-form__reset');
  var formAdressInput = applicationForm.querySelector('#address');
  var successMessage = document.querySelector('.success');
  var StartPinCoordinate = {
    X: 570,
    Y: 375
  };
  var TitleLength = {
    MIN: 2,
    MAX: 30
  };
  formAdressInput.value = StartPinCoordinate.X + Math.ceil(window.pin.WIDTH / 2) + ', ' + (StartPinCoordinate.Y + window.pin.HEIGHT);

  for (var s = 0; s < applicationFormFieldSet.length; s++) {
    applicationFormFieldSet[s].setAttribute('disabled', 'disabled');
  }
  function markValid(inputName) {
    inputName.setAttribute('style', 'outline: inherit;');
  }
  function markInvalid(inputName) {
    inputName.setAttribute('style', 'outline: 1px solid #ffaa99;');
  }


  inputTitle.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < TitleLength.MIN) {
      inputTitle.setCustomValidity('Минимальная длина заголовка — 30 символов');
      markInvalid(inputTitle);
    } else if (target.value.length > TitleLength.MAX) {
      inputTitle.setCustomValidity('');
      markValid(inputTitle);
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

  typeSelect.addEventListener('input', function (evt) {
    var target = evt.target;

    var selectValue = target.value;
    var currentPrice = +inputPrice.value;

    if (currentPrice <= typeToPrice[selectValue]) {
      inputPrice.min = typeToPrice[selectValue];
      inputPrice.placeholder = 'от ' + typeToPrice[selectValue] + ' рублей';
      inputPrice.setCustomValidity('Минимальная цена - ' + typeToPrice[selectValue]);
      markInvalid(inputPrice);
    } else {
      inputPrice.setCustomValidity('');
      markInvalid(inputPrice);
    }
  });

  function setCapacity() {
    var rooms = +roomNumberSelect.value;
    var places = +capacitySelect.value;

    capacitySelect.setCustomValidity('');
    markValid(capacitySelect);

    if (rooms === 100 && places !== 0) {
      markInvalid(capacitySelect);
      capacitySelect.setCustomValidity('Не предназначено для гостей');
    } else if (rooms < places) {
      markInvalid(capacitySelect);
      capacitySelect.setCustomValidity('Максимальное количество гостей - ' + rooms);
    } else if (rooms !== 100 && places === 0) {
      markInvalid(capacitySelect);
      capacitySelect.setCustomValidity('Не для гостей - только 100 комнат');
    }
  }

  capacitySelect.addEventListener('input', function () {
    setCapacity();
  });

  function validateTitle() {
    if (inputTitle.validity.tooShort) {
      inputTitle.setCustomValidity('Минимальная длина заголовка — 30 символов');
      markInvalid(inputTitle);
    } else {
      inputTitle.setCustomValidity('');
      markValid(inputTitle);
    }

  }

  function validatePrice() {
    if (inputPrice.validity.valueMissing) {
      inputPrice.setCustomValidity('Обязательное поле для заполнения');
      markInvalid(inputPrice);
    } else if (inputPrice.validity.rangeUnderflow) {
      inputPrice.setCustomValidity('Значение меньше ' + inputPrice.min);
      markInvalid(inputPrice);
    } else {
      inputPrice.setCustomValidity('');
      markValid(inputPrice);
    }
  }

  inputPrice.addEventListener('input', function () {
    if (inputPrice.value < inputPrice.min) {
      inputPrice.setCustomValidity('Значение меньше чем ' + inputPrice.min);
      markInvalid(inputPrice);
    } else {
      inputPrice.setCustomValidity('');
      markValid(inputPrice);
    }
  });

  function deactivateApp() {
    window.advert.applicationForm.classList.add('ad-form--disabled');
    window.map.offersArea.classList.add('map--faded');
    formAdressInput.value = '603, 462';
    for (s = 0; s < applicationFormFieldSet.length; s++) {
      applicationFormFieldSet[s].setAttribute('disabled', 'disabled');
    }
    setTimeout(function () {
      successMessage.classList.add('hidden');
    }, 3000);
    window.pin.removeData();
    window.pin.disableMapFilters();
    window.map.startPin.setAttribute('style', 'left: ' + StartPinCoordinate.X + 'px; ' + 'top: ' + StartPinCoordinate.Y + 'px;');
    window.map.startPin.addEventListener('mouseup', window.map.onStartPinClick);
  }

  submitButton.addEventListener('click', function (evt) {
    if (inputTitle.checkValidity() && inputPrice.checkValidity() && capacitySelect.checkValidity()) {
      window.backend.upload(new FormData(applicationForm), function () {
        successMessage.classList.remove('hidden');
        applicationForm.reset();
        deactivateApp();

      });
      evt.preventDefault();
    } else {
      validateTitle();
      validatePrice();
      setCapacity();
    }
  });

  resetButton.addEventListener('click', function () {
    applicationForm.reset();
    deactivateApp();
  });

  return {
    applicationForm: applicationForm,
    applicationFormFieldSet: applicationFormFieldSet,
    formAdressInput: formAdressInput,
    successMessage: successMessage
  };
})();


