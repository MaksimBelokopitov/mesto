import Popup from "../Popup/Popup";
export default class PopupDelete extends Popup{
    constructor(popupSelector, {handleFormSubmit}){
        super(popupSelector)
        this._form = this._popup.querySelector('.popup__form');
        this._handleFormSubmit = handleFormSubmit;
    };

    open(id, card){
        super.open();
        this._id = id;
        this._card = card;
    };

    close(){
        super.close();
    };

    setEventListener(){
        super.setEventListener();
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleFormSubmit(this._id, this._card);
        });
    };
};