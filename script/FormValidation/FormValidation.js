


class FormValidation {
  constructor(data, form){
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._form = form;
  };

  _showError(inputElement,formElement, errorMessage){
    inputElement.classList.add(this._inputErrorClass);
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideError(formElement, inputElement){
    inputElement.classList.remove(this._inputErrorClass);
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
  };

  _checkInputValidity(
    formElement, 
    inputElement,
  ){
    if (!inputElement.validity.valid){
      this._showError(inputElement, formElement,inputElement.validationMessage);
      }
    else {
      this._hideError(formElement, inputElement,);
    };
  };

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
    }); 
  };

  _enableSubmitButton (buttonElement) {
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  };

  _disableSubmitButton (buttonElement) {
    buttonElement.classList.remove(this._inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  };

  _toggleButtonState (inputList, buttonElement) {
      if (this._hasInvalidInput(inputList)){
        this._enableSubmitButton(buttonElement);  
      }
      else {
        this._disableSubmitButton(buttonElement);
      };
  };

  _setEventListener (){
      const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
      const buttonElement = this._form.querySelector(this._submitButtonSelector);
      this._toggleButtonState(inputList, buttonElement);
      inputList.forEach((inputElement) =>{
        inputElement.addEventListener('input', () => {
          this._checkInputValidity(this._form, inputElement);
          this._toggleButtonState(inputList, buttonElement);
          this._form.addEventListener('reset',() => {
          this._enableSubmitButton(buttonElement);
         });
        });
      });
    };

    enableValidation () {
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
        this._setEventListener();
     };
};

export {FormValidation};



