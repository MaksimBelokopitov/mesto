import { openPopup, figureWindow, figureImage, figureCaption } from "../index.js";

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
      this._element.querySelector('.mesto__like-button').classList.toggle('mesto__like-button_active');
    };

    _deleteCard(){
      this._element.remove(); 
      this._element = null;
    };

    _handleOpenPopup(){
        figureImage.src = this._link;
        figureImage.alt = this._name;
        figureCaption.textContent = this._name;
        openPopup(figureWindow);
    };

    generateCard() {
      this._element = this._getTemplate();
      this._picture = this._element.querySelector('.mesto__image');

      this._element.querySelector('.mesto__like-button').addEventListener('click', () => {
        this._likeCard()
      });

      this._element.querySelector('.mesto__delete-button').addEventListener('click', () => {
        this._deleteCard()
      });

      this._picture.addEventListener('click', () => {
        this._handleOpenPopup();
      })
      
      this._picture.src = this._link;
      this._picture.alt = this._name;
      this._element.querySelector('.mesto__title').textContent = this._name;
  
      return this._element;
    };
  }

  

  



