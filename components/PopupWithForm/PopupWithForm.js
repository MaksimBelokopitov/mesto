import Popup from "../Popup/Popup.js";

export default class PopupWithForm extends Popup {
    constructor(poupSelector, {handleFormSubmit}){
        super(poupSelector);
        this._popup = document.querySelector(poupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__form');
        this._inputs = this._popup.querySelectorAll('.popup__input');
        
    }

    _getInputValues(){
        this._inputValues = {};
        this._inputs.forEach(item =>{
            this._inputValues[item.name] = item.value;
        });
        return this._inputValues; 
    };

    close(){
        super.close();
        this._form.reset();
    }

    setEventListener(){
        
        this._form.addEventListener('submit', (event) => {
            event.preventDefault()
            this._handleFormSubmit (this._getInputValues());
           
            console.log(this._inputValues)
        })
        

    }

    
}