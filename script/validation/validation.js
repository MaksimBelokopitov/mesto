document.addEventListener('DOMContentLoaded', function(){




const showError = (formElement, inputElement, errorMessage) => {
  inputElement.classList.add('popup__input_type_error');
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__error_visible');
};

const hideError = (formElement, inputElement) => {
  inputElement.classList.remove('popup__input_type_error');
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  errorElement.textContent = '';
  errorElement.classList.remove('form__input-error_active');
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid){
    showError(formElement, inputElement, inputElement.validationMessage);
  }
  else {
    hideError(formElement, inputElement);
  };
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  }); 
  }

  const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)){
      buttonElement.classList.add('popup__button_disabled')
    }
    else {
       buttonElement.classList.remove('popup__button_disabled')
    }
  }

function setEventListener(formElement){
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button');
    toggleButtonState(inputList, buttonElement)
    inputList.forEach((inputElement) =>{
      inputElement.addEventListener('input', function(){
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement)
      })
    })
  }

  const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form')); 
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setEventListener(formElement);
    }); 
   };

   enableValidation()

})


