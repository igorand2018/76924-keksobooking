//  Файл form.js
'use strict';
window.formValidation = (function () {
  var adForm = document.querySelector('.ad-form');
  var adFormFieldSet = document.querySelectorAll('.ad-form__element');
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
  formAdressInput.value = '570, 320';

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

  submitButton.addEventListener('click', function () {

    if (inputTitle.checkValidity() && inputPrice.checkValidity() && capacitySelect.checkValidity()) {
      adForm.submit();
    } else {
      validateTitle();
      validatePrice();
      setCapacity();
      window.formValidation.setInputPrice();
    }

  });

  resetButton.addEventListener('click', function () {
    adForm.reset();
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

  };

  // window.adForm = adForm;
  // window.adFormFieldSet = adFormFieldSet;
  // window.formAdressInput = formAdressInput;
})();

