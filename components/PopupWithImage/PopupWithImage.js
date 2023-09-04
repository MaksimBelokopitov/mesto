import Popup from "../Popup/Popup.js";
class PopupWithImage extends Popup {
    constructor(popupSelector,imageLink, imageAlt){
        super(popupSelector);
        this._popup = document.querySelector(popupSelector);
        this._link = imageLink;
        this._alt = imageAlt;
    }

    open(){
        super.open();
        this._popupImage = this._popup.querySelector('.popup__figure-image');
        this._popupCaption = this._popup.querySelector('.popup__figure-subtitle');
        this._popupImage.src = this._link;
        this._popupImage.alt = this._alt;
        this._popupCaption.textContent = this._alt;

        super.setEventListener()
    }
}

export default PopupWithImage