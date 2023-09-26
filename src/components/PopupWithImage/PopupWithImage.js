import Popup from "../Popup/Popup.js";
class PopupWithImage extends Popup {
    constructor(popupSelector){
        super(popupSelector);
        super.setEventListener()
        this._popupImage = this._popup.querySelector('.popup__figure-image');
        this._popupCaption = this._popup.querySelector('.popup__figure-subtitle');
    }

    open(imageLink, imageAlt){
        super.open();
        this._popupImage.src = imageLink;
        this._popupImage.alt = imageAlt;
        this._popupCaption.textContent = imageAlt;
    }
}

export default PopupWithImage