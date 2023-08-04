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

//Создание карточек места при загрузке страницы//

const mestoList = document.querySelector('.mesto__list');
const mestoTemplate = document.querySelector('#mesto-item').content;
const figureWindow = document.querySelector('.popup_type_figure');
const figureImage = figureWindow.querySelector('.popup__figure-image');
const figureCaption = figureWindow.querySelector('.popup__figure-subtitle');

function createCard(item) {
  const mestoCard = mestoTemplate.querySelector('.mesto__item').cloneNode(true);

  const mestoPicture = mestoCard.querySelector('.mesto__image');
  mestoPicture.alt = item.name;
  mestoPicture.src = item.link;

  const mestoName = mestoCard.querySelector('.mesto__title');
  mestoName.textContent = item.name;

  const deleteButton = mestoCard.querySelector(".mesto__delete-button");
  deleteButton.addEventListener("click", deleteCard);

  const likeButton = mestoCard.querySelector('.mesto__like-button');
  likeButton.addEventListener("click", likeCard);

  mestoPicture.addEventListener('click', () => {
      figureImage.src = mestoPicture.src;
      figureImage.alt = mestoPicture.alt;
      figureCaption.textContent = mestoPicture.alt;
      openPopup(figureWindow)
    });
  return  mestoCard
};

function createInitialCards(arr) {
  for (let i = 0; i < arr.length; i++){
  const mestoElement = createCard(arr[i]); 
  mestoList.append(mestoElement); 
  };
};

// Кнопка лайка у карточек места//

const likeCard = (e) => {
  const likeEl= e.target.closest(".mesto__like-button");
  likeEl.classList.toggle('mesto__like-button_active');
};

// Удаление карточек места//
   
const deleteCard = (e) => {
  const el = e.target.closest(".mesto__item");
  el.remove();
};

//Открытие попапов//
function openPopup(popup) {
  popup.classList.add('popup_opened')
}

// Закрытие попапов 
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

const closeButtons = document.querySelectorAll('.popup__button-close');
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click',() => {
    closePopup(popup)});
});

function closePopupOverlay(popupWindow){
  popupWindow.addEventListener('click', (evt) => {
    if( evt.currentTarget === evt.target){
      closePopup(popupWindow);
    };
  });
};

function closePopupEsc(popupWindow){
  document.addEventListener('keydown', function(evt) {
    if( evt.key === 'Escape'){
      closePopup(popupWindow);
    };
  });
};

const popupArr = document.querySelectorAll('.popup');
popupArr.forEach((popup) =>{
  closePopupOverlay(popup);
  closePopupEsc(popup);
});

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
    openPopup(mestoWindow)
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
    const newCard = {};
    newCard.link = cardImageInput.value;
    newCard.name = cardNameInput.value;
    const mestoNewElement = createCard(newCard);
    mestoList.prepend(mestoNewElement);
    closePopup(mestoWindow);
    evt.target.reset();
  };
    
  mestoFormElement.addEventListener('submit', handleMestoFormSubmit,);


};

document.addEventListener('DOMContentLoaded', function(){
   
  createInitialCards(initialCards);
  initPopups();   
});




