import Popup from "../Popup/Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, {handleFormSubmit}){
        super(popupSelector);
        this._popup = document.querySelector(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__form');
        this._inputs = this._form.querySelectorAll('.popup__input');
        this.button = this._popup.querySelector('.popup__button');
    }

    _getInputValues(){
        this.inputValues = {};
        this._inputs.forEach(item =>{
            this.inputValues[item.name] = item.value;
        });
        return this._inputValues; 
    };

    setInputValues(data){
        this._inputs.forEach(item => {
            item.value = data[item.name];
        });
    };

    close(){
        super.close();
        this._form.reset();
    };

    setEventListener(){
        super.setEventListener()
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._getInputValues();
            this._handleFormSubmit (); 
        });
    }; 
};