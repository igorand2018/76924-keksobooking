
'use strict';
window.formValidation = (function () {
  var adForm = document.querySelector('.ad-form');
  var adFormFieldSet = adForm.getElementsByTagName('fieldset');
  var inputTitle = adForm.querySelector('#title');
  var typeSelect = adForm.querySelector('#type');
  var inputPrice = adForm.querySelector('#price');
  var timeinSelection = adForm.querySelector('#timein');
  var timeoutSelection = adForm.querySelector('#timeout');
  var roomNumberSelect = adForm.querySelector('#room_number');
  var capacitySelect = adForm.querySelector('#capacity');
  var submitButton = adForm.querySelector('.ad-form__submit');
  var resetButton = adForm.querySelector('.ad-form__reset');
  var formAdressInput = document.getElementById('address');
  var successMessage = document.querySelector('.success');
  formAdressInput.value = '603, 462';

  for (var s = 0; s < adFormFieldSet.length; s++) {
    adFormFieldSet[s].setAttribute('disabled', 'disabled');
  }
  function markValid(inputName) {
    inputName.style.outline = 'inherit';
  }
  function markInvalid(inputName) {
    inputName.style.outline = '1px solid #ffaa99';
  }


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
    window.formValidation.adForm.classList.add('ad-form--disabled');
    window.map.map.classList.add('map--faded');
    formAdressInput.value = '603, 462';
    for (s = 0; s < adFormFieldSet.length; s++) {
      adFormFieldSet[s].setAttribute('disabled', 'disabled');
    }
    setTimeout(function () {
      successMessage.classList.add('hidden');
    }, 3000);
    window.pin.removePins();
    window.map.startPin.style.left = '570px';
    window.map.startPin.style.top = '375px';
  }

  submitButton.addEventListener('click', function (evt) {

    if (inputTitle.checkValidity() && inputPrice.checkValidity() && capacitySelect.checkValidity()) {
      window.upload(new FormData(adForm), function () {
        successMessage.classList.remove('hidden');
        adForm.reset();
        deactivateApp();

      });
      evt.preventDefault();
    } else {
      validateTitle();
      validatePrice();
      setCapacity();
      window.formValidation.setInputPrice();
    }

  });

  resetButton.addEventListener('click', function () {
    adForm.reset();
    deactivateApp();
  });

  return {
    setInputPrice: function (evt) {
      var target = evt.target;
      var selectValue = target.value;
      var currentPrice = +inputPrice.value;

      if (currentPrice < typeToPrice[selectValue]) {
        inputPrice.min = typeToPrice[selectValue];
        inputPrice.placeholder = 'от ' + typeToPrice[selectValue] + ' рублей';
        inputPrice.setCustomValidity('Минимальная цена' + typeToPrice[selectValue]);
        markInvalid(inputPrice);
      } else {
        inputPrice.setCustomValidity('');
        markInvalid(inputPrice);
      }
    },
    adForm: adForm,
    adFormFieldSet: adFormFieldSet,
    formAdressInput: formAdressInput,
    successMessage: successMessage
  };
})();


