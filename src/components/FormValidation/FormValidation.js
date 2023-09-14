
export default class FormValidation {
  constructor(data, form){
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
  };

  _showError(inputElement, errorMessage){
    inputElement.classList.add(this._inputErrorClass);
    const errorElement = inputElement.closest('.popup__form-field').querySelector('.popup__error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideError(inputElement){
    inputElement.classList.remove(this._inputErrorClass);
    const errorElement = inputElement.closest('.popup__form-field').querySelector('.popup__error');
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
  };

  _checkInputValidity(inputElement){
    if (!inputElement.validity.valid){
      this._showError(inputElement,inputElement.validationMessage);
      }
    else {
      this._hideError(inputElement);
    };
  };

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
    return !inputElement.validity.valid;
    }); 
  };

  _enableSubmitButton () {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true);
  };

  _disableSubmitButton () {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled');
  };

  _toggleButtonState () {
      if (this._hasInvalidInput()){
        this._enableSubmitButton();  
      }
      else {
        this._disableSubmitButton();
      };
  };

  _setEventListener (){
    this._toggleButtonState();
    this._inputList.forEach((inputElement) =>{
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
      inputElement.onblur = () => {
        this._hideError(inputElement)
      }
    });
    this._form.addEventListener('reset',() => {
      this._enableSubmitButton();
    });
  };

  enableValidation () {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListener();  
  };    
};





