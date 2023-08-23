import { Card, mestoList } from "./Card/Card.js";

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
};

const popupList = Array.from(document.querySelectorAll('.popup'));
popupList.forEach((popup) => {
  popup.addEventListener('mouseup', (event) => { 
    const targetClassList = event.target.classList; 
    if (targetClassList.contains('popup') || targetClassList.contains('popup__button-close')) { 
      closePopup(popup); 
    };
  });
});

const closePopupEsc =(evt) =>{
    if( evt.key === 'Escape'){
      const popupActive =document.querySelector('.popup_opened');
      closePopup(popupActive);
    };
};


//Попапы//

function initPopups(){

  //Попап редактирования профиля
    
  const editButton = document.querySelector('.profile__edit-button');
  const profileWindow = document.querySelector('.popup_type_profile');
  const userName = document.querySelector('.profile__name');
  const userJob = document.querySelector('.profile__job');

  editButton.addEventListener('click', () => {
    openPopup(profileWindow);
    nameInput.value = userName.textContent;
    jobInput.value = userJob.textContent;
  });

  //Попап доваления карточки места
  
  const addButton = document.querySelector('.profile__add-button');
  const mestoWindow = document.querySelector('.popup_type_mesto');

  addButton.addEventListener('click', () => {
    openPopup(mestoWindow);
  });
    
  // Работа форм в попапах
    
    // Редактирование профиля

  const profileFormElement = document.forms['profile'];
  const nameInput = profileFormElement.querySelector('.popup__input_type_user-name');
  const jobInput = profileFormElement.querySelector('.popup__input_type_user-job');

  function handleProfileFormSubmit (evt) {
    evt.preventDefault(); 
    userName.textContent = nameInput.value;
    userJob.textContent = jobInput.value;
    closePopup(profileWindow);
  };  
    
  profileFormElement.addEventListener('submit', handleProfileFormSubmit);

    //Добавление новой карточки

  const mestoFormElement = document.forms['mesto'];
  const cardNameInput = mestoFormElement.querySelector('.popup__input_type_mesto-name');
  const cardImageInput = mestoFormElement.querySelector('.popup__input_type_mesto-image');  
    
  function handleMestoFormSubmit(evt) {
    evt.preventDefault();
    const newCardObj = {};
    newCardObj.link = cardImageInput.value;
    newCardObj.name = cardNameInput.value;
    const card = new Card(newCard, '.mesto-template');
    const cardElement = card.generateCard();
    mestoList.prepend(cardElement);
    closePopup(mestoWindow);
    evt.target.reset();
  };
    
  mestoFormElement.addEventListener('submit', handleMestoFormSubmit,);
};

document.addEventListener('DOMContentLoaded', function(){
   initPopups();   
});

export {openPopup, closePopup}




