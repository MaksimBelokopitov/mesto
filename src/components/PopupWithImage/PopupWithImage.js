import Popup from "../Popup/Popup.js";
class PopupWithImage extends Popup {
    constructor(popupSelector){
        super(popupSelector);
        super.setEventListener()
        this._popup = document.querySelector(popupSelector);
        this._popupImage = this._popup.querySelector('.popup__figure-image');
        this._popupCaption = this._popup.querySelector('.popup__figure-subtitle');
    }

    open(imageLink, imageAlt){
        this._link = imageLink;
        this._alt = imageAlt;
        super.open();
        this._popupImage.src = this._link;
        this._popupImage.alt = this._alt;
        this._popupCaption.textContent = this._alt;
    }
}

export default PopupWithImage