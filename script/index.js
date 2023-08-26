import { Card } from "./Card/Card.js";
import { FormValidation} from "./FormValidation/FormValidation.js";
import { initialCards } from "./cards/cards.js";
import { settingValidation } from "./settingValidation/settingValidation.js";


const figureWindow = document.querySelector('.popup_type_figure');
const figureImage = figureWindow.querySelector('.popup__figure-image');
const figureCaption = figureWindow.querySelector('.popup__figure-subtitle');


//Открытие и закрытие попапов//

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

const mestoList = document.querySelector('.mesto__list');

initialCards.forEach((item) => {
  const card = new Card (item, '.mesto-template');
  const cardElement = card.generateCard();

  mestoList.append(cardElement);
});

//Валидация форм//

const formList = document.querySelectorAll('.popup__form');

formList.forEach((form) => {
  const validation = new FormValidation( settingValidation, form);
  validation.enableValidation();
})


//Попапы//


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
    const card = new Card(newCardObj, '.mesto-template');
    const cardElement = card.generateCard();
    mestoList.prepend(cardElement);
    closePopup(mestoWindow);
    evt.target.reset();
  };
    
  mestoFormElement.addEventListener('submit', handleMestoFormSubmit,);

export {openPopup, figureWindow, figureImage, figureCaption}




