
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
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

// Закрытие попапов 
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

const popupList = Array.from(document.querySelectorAll('.popup'));
popupList.forEach((popup) => {
  popup.addEventListener('mouseup', (event) => { 
    const targetClassList = event.target.classList; 
    if (targetClassList.contains('popup') || targetClassList.contains('popup__button-close')) { 
      closePopup(popup); 
    }
  })
})

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




