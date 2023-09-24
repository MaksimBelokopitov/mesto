  
  export default class Card {
    constructor(userId, data, temlateSelector, {handleCardClick}, {like}, {dislike}, {openDeletePopup}){
      this.name = data.name;
      this.link = data.link;
      this._data = data;
      this.id = data._id;
      this._userId = userId;
      this._handleCardClick = handleCardClick;
      
      this._ownerId = data.owner._id;
      this._like = like;
      this._dislike = dislike; 
      this._openDeletePopup = openDeletePopup

      this._templateSelector = temlateSelector;
    }
    _getTemplate(){
      const cardElement = document.querySelector(this._templateSelector).content.querySelector('.mesto__item').cloneNode(true);
      return cardElement;
    };

    _likeCard(){
      this._likeButton.classList.toggle('mesto__like-button_active');
    };

    _getUserCard(){
      if (this._userId !== this._ownerId){
        this._deleteButton.remove()
      }
    }

    likeCounter(data){
      this._likes = data.likes;
      this._counter.textContent = this._likes.length
    }

    _setEventListeners(){
      this._likeButton.addEventListener('click', () => {
        if(this._likeButton.classList.contains('mesto__like-button_active')){
          this._dislike();
          this._likeCard()
        }
        else {
          this._like();
          this._likeCard()
        }
      });

      this._deleteButton.addEventListener('click', () => {
       this._openDeletePopup()
      });

      this._picture.addEventListener('click', () => {
        this._handleCardClick();
      })
    }

    generateCard() {
      this.element = this._getTemplate();
      this._picture = this.element.querySelector('.mesto__image');
      this._likeButton = this.element.querySelector('.mesto__like-button');
      this._deleteButton = this.element.querySelector('.mesto__delete-button');
      this._counter = this.element.querySelector('.mesto__like-counter')

      this._getUserCard();
      this._setEventListeners();
      this.likeCounter(this._data)
     
      this._picture.src = this.link;
      this._picture.alt = this.name;
      this.element.querySelector('.mesto__title').textContent = this.name;
     
      return this.element;
    };
  }

  

  



