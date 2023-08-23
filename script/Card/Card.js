import {openPopup} from "../index.js";



const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 

  export const mestoList = document.querySelector('.mesto__list');
  const figureWindow = document.querySelector('.popup_type_figure');
  const figureImage = figureWindow.querySelector('.popup__figure-image');
  const figureCaption = figureWindow.querySelector('.popup__figure-subtitle');
  const c = (a) =>{console.log(a);}


 export class Card {
    constructor(data, temlateSelector){
      this._name = data.name;
      this._link = data.link;
      this._templateSelector = temlateSelector;
    }
    _getTemplate(){
      const cardElement = document.querySelector(this._templateSelector).content.querySelector('.mesto__item').cloneNode(true);
      return cardElement;
    };

    _likeCard(){
      this._element.querySelector('.mesto__like-button').addEventListener('click', () =>{
        this._element.querySelector('.mesto__like-button').classList.toggle('mesto__like-button_active');
      });
    };

    _deleteCard(){
      this._element.querySelector('.mesto__delete-button').addEventListener('click', () =>{
        this._element.remove();
      });
    };

    _handleOpenPopup(){
      this._element.querySelector('.mesto__image').addEventListener('click', () => {
        figureImage.src = this._link;
        figureImage.alt = this._name;
        figureCaption.textContent = this._name;
        openPopup(figureWindow);
      });
    };

    generateCard() {
      this._element = this._getTemplate();
      this._likeCard();
      this._deleteCard();
      this._handleOpenPopup();
  
      this._element.querySelector('.mesto__image').src = this._link;
      this._element.querySelector('.mesto__image').alt = this._name;
      this._element.querySelector('.mesto__title').textContent = this._name;
  
      return this._element;
    };
  }

  initialCards.forEach((item) => {
    const card = new Card (item, '.mesto-template');
    const cardElement = card.generateCard();

    mestoList.append(cardElement);
  });

  



