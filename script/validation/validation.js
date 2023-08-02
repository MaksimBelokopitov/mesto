document.addEventListener('DOMContentLoaded', function(){

const showError = (
  formElement, 
  inputElement, 
  errorMessage, 
  inputErrorClass,
  errorClass
  ) => {
    inputElement.classList.add(inputErrorClass);
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};

const hideError = (
  formElement, 
  inputElement,
  inputErrorClass,
  errorClass) => {
    inputElement.classList.remove(inputErrorClass);
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove(errorClass);
};

const checkInputValidity = (
  formElement, 
  inputElement,  
  inputErrorClass,
  errorClass) => {
    if (!inputElement.validity.valid){
      showError(
        formElement,
        inputElement, 
        inputElement.validationMessage, 
        inputErrorClass,
        errorClass);
      }
    else {
      console.log(inputElement.validity.valid)
      hideError(
        formElement, 
        inputElement, 
        inputErrorClass,
        errorClass);
    };
  };

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  }); 
  }

const toggleButtonState = (
  inputList, 
  buttonElement, 
  inactiveButtonClass) => {
    if (hasInvalidInput(inputList)){
      buttonElement.classList.add(inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    }
    else {
      buttonElement.classList.remove(inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
}

function setEventListener(
  formElement, 
  inputSelector, 
  submitButtonSelector, 
  inactiveButtonClass,
  inputErrorClass,
  errorClass){
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    inputList.forEach((inputElement) =>{
      inputElement.addEventListener('input', function(){
        checkInputValidity(
          formElement, 
          inputElement,
          inputErrorClass,
          errorClass);
        toggleButtonState(inputList, buttonElement, inactiveButtonClass);
      });
    });
  };

  const enableValidation = (arg) => {
    const formList = Array.from(document.querySelectorAll(arg.formSelector)); 
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setEventListener(formElement, 
        arg.inputSelector, 
        arg.submitButtonSelector, 
        arg.inactiveButtonClass,
        arg.inputErrorClass,
        arg.errorClass);
    }); 
   };

   enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }); 
});


