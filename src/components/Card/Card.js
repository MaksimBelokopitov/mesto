
  export default class Card {
    constructor(data, temlateSelector, {handleCardClick}){
      this._handleCardClick = handleCardClick;
      this._name = data.name;
      this._link = data.link;
      this._templateSelector = temlateSelector;
    }
    _getTemplate(){
      const cardElement = document.querySelector(this._templateSelector).content.querySelector('.mesto__item').cloneNode(true);
      return cardElement;
    };

    _likeCard(){
      this._likeButton.classList.toggle('mesto__like-button_active');
    };

    _deleteCard(){
      this._element.remove(); 
      this._element = null;
    };

    _setEventListeners(){
       this._likeButton.addEventListener('click', () => {
        this._likeCard()
      });

       this._deleteButton.addEventListener('click', () => {
        this._deleteCard()
      });

      this._picture.addEventListener('click', () => {
        this._handleCardClick();
      })
    }

    generateCard() {
      this._element = this._getTemplate();
      this._picture = this._element.querySelector('.mesto__image');
      this._likeButton = this._element.querySelector('.mesto__like-button');
      this._deleteButton = this._element.querySelector('.mesto__delete-button');
      
      this._setEventListeners();
      
      this._picture.src = this._link;
      this._picture.alt = this._name;
      this._element.querySelector('.mesto__title').textContent = this._name;
  
      return this._element;
    };
  }

  

  



