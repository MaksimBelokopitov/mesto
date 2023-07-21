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

function createInitialCards(arr) {
        
  for (let i = 0; i < arr.length; i++){
    const mestoElement = mestoTemplate.querySelector('.mesto__item').cloneNode(true);
    const mestoPicture = mestoElement.querySelector('.mesto__image');
    mestoPicture.alt = arr[i].name;
    mestoPicture.src = arr[i].link;
    const mestoName = mestoElement.querySelector('.mesto__title');
    mestoName.textContent = arr[i].name;
    mestoList.append(mestoElement); 
  };
};

// Кнопка лайка у карточек места//

function likeCard(){
  mestoList.addEventListener('click', ({target}) => {
    const likeButton = target.closest('.mesto__like-button');
    if ( !likeButton) return;
    likeButton.classList.toggle('mesto__like-button_active');
    });
};

likeCard();
  
// Удаление карточек места//
   
function deleteCard() {
  mestoList.addEventListener('click', ({target}) => {
    const deleteButton = target.closest('.mesto__delete-button');
    const cardItem = target.closest('.mesto__item');
    if ( !deleteButton) return;
    cardItem.remove();
  });
};

deleteCard();

//Попапы//

function workPopup(){

  //Открытие попапов//

    //Попап редактирования профиля
  
  const editButton = document.querySelector('.profile__edit-button');
  const profileWindow = document.querySelector('.popup_type_profile');
  const userName = document.querySelector('.profile__name');
  const userJob = document.querySelector('.profile__job');

 

  editButton.addEventListener('click', () => {
    profileWindow.classList.add('popup_opened');
    nameInput.value = userName.textContent;
    jobInput.value = userJob.textContent;
  });

    //Попап доваления карточки места
  
  const addButton = document.querySelector('.profile__add-button');
  const mestoWindow = document.querySelector('.popup_type_mesto');

  addButton.addEventListener('click', () => {
    mestoWindow.classList.add('popup_opened');
  });

    //Попап картинок
  const figureTemplate = document.querySelector('#mesto-figure').content;
  const figureWindow = figureTemplate.querySelector('.popup_type_figure').cloneNode(true);
  const figureImage = figureWindow.querySelector('.popup__figure-image');
  const figureCaption = figureWindow.querySelector('.popup__figure-subtitle');
  const pageDocument = document.querySelector('.page');
    
  mestoList.addEventListener('click', ({target}) => {
    const cardTarget = target.closest('.mesto__image');
    if (!cardTarget) return;
      figureImage.src = cardTarget.src;
      figureImage.alt = cardTarget.alt;
      figureCaption.textContent = cardTarget.alt;
      pageDocument.append(figureWindow)
      figureWindow.classList.add('popup_opened');
    });

  // Закрытие попапов 

    // Попап редактирования профиля
    const profileCloseButton = document.querySelector('.popup__button-close_type_profile');

    function closeProfile() {
      profileWindow.classList.remove('popup_opened');
    };
         
    profileCloseButton.addEventListener('click', () => {
      closeProfile();
    });

    //Попап доваления карточки места
  
  const mestoCloseButton = document.querySelector('.popup__button-close_type_mesto');
  
  mestoCloseButton.addEventListener('click', () => {
    closeMesto();
  });

  function closeMesto() {
    mestoWindow.classList.remove('popup_opened');
  };

    //Попап картинок 

  const figureCloseButton = figureWindow.querySelector('.popup__button-close_type_figure');

  function closeFigure() {
    figureWindow.classList.remove('popup_opened');
    figureWindow.remove()
  };

  figureCloseButton.addEventListener('click', ()  => {
    closeFigure();
  })

    
  // Работа форм в попапах
    
    // Редактирование профиля

  const profileFormElement = document.querySelector('.popup__form_type_profile');
  const nameInput = document.querySelector('.popup__input_type_user-name')
  const jobInput = document.querySelector('.popup__input_type_user-job');

  function handleProfileFormSubmit (evt) {
    evt.preventDefault(); 
    userName.textContent = nameInput.value;
    userJob.textContent = jobInput.value;
    closeProfile();
  };  
    
  profileFormElement.addEventListener('submit', handleProfileFormSubmit);

    // Добавление новой карточки

  const mestoFormElement = document.querySelector('.popup__form_type_mesto');
  const cardNameInput = document.querySelector('.popup__input_type_mesto-name');
  const cardImageInput = document.querySelector('.popup__input_type_mesto-image');  
  
    
    //Создание новой карточки//
  function createNewCard() { 
    const mestoElement = mestoTemplate.querySelector('.mesto__item').cloneNode(true);
    const mestoPicture = mestoElement.querySelector('.mesto__image');
    mestoPicture.alt = cardNameInput.value;
    mestoPicture.src = cardImageInput.value;
    const mestoName = mestoElement.querySelector('.mesto__title');
    mestoName.textContent = cardNameInput.value;
    mestoList.prepend(mestoElement); 
    cardNameInput.value = ''; 
    cardImageInput.value = '';
  };
    
  function handleMestoFormSubmit(evt) {
    evt.preventDefault();
    createNewCard();
    closeMesto();
  };
    
  mestoFormElement.addEventListener('submit', handleMestoFormSubmit,);
};

document.addEventListener('DOMContentLoaded', function(){
   
  createInitialCards(initialCards);
  workPopup();   
});

