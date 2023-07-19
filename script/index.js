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

    //Создание карточек//
const mestoList = document.querySelector('.mesto__list');

function createInitialCards(arr) {
      
  const mestoTemplate = document.querySelector('#mesto-item').content;
        
  for (let i = 0; i < arr.length; i++){
    const mestoElement = mestoTemplate.querySelector('.mesto__item').cloneNode(true);
    const mestoPicture = mestoElement.querySelector('.mesto__image');
    mestoPicture.alt = arr[i].name;
    mestoPicture.src = arr[i].link;
    const mestoName = mestoElement.querySelector('.mesto__title');
    mestoName.textContent = arr[i].name;
    mestoList.append(mestoElement); 
  }

  likeCard()
}

  // Кнопка лайка//

function likeCard(){
  const likeButtons = document.querySelectorAll('.mesto__like-button');

  likeButtons.forEach((elem) => {
    elem.addEventListener('click', () =>{
      elem.classList.toggle('mesto__like-button_active')
    })
  })
}

   // Удаление карточек//
function deleteCard(){

const mestoDeleteButton = document.querySelectorAll('.mesto__delete-button');
      
mestoDeleteButton.forEach((elem) => {
  elem.addEventListener('click', () => {
    const mestoCard = elem.closest('.mesto__item');
    mestoCard.remove() ;
    })
  })
}

    //Попапы//

function workPopup(){

      //Открытие попапов//
  const editButton = document.querySelector('.profile__edit-button');
  const addButton = document.querySelector('.profile__add-button');
  const profileWindow = document.querySelector('.popup_type_profile');
  const mestoWindow = document.querySelector('.popup_type_mesto');
  const userName = document.querySelector('.profile__name');
  const userJob = document.querySelector('.profile__job');
    
  editButton.addEventListener('click', () => {
    profileWindow.classList.add('popup_opened');
    nameInput.value = userName.textContent;
    jobInput.value = userJob.textContent;
  });
    
  addButton.addEventListener('click', () => {
    mestoWindow.classList.add('popup_opened');
  });
    
        // Закрытие попапов //
  const profileCloseButton = document.querySelector('.popup__button-close_type_profile');
  const mestoCloseButton = document.querySelector('.popup__button-close_type_mesto');
    
  function closeProfile() {
    profileWindow.classList.remove('popup_opened');
  };
    
  function closeMesto() {
    mestoWindow.classList.remove('popup_opened');
  };
        
  profileCloseButton.addEventListener('click', () => {
    closeProfile();
  });
    
  mestoCloseButton.addEventListener('click', () => {
    closeMesto();
  });
    
        // Работа форм в попапах
    
            // Редактирование профиля//
  const profileFormElement = document.querySelector('.popup__form_type_profile');
  const mestoFormElement = document.querySelector('.popup__form_type_mesto');
  const nameInput = document.querySelector('.popup__input_type_user-name')
  const jobInput = document.querySelector('.popup__input_type_user-job');
  const cardNameInput = document.querySelector('.popup__input_type_mesto-name');
  const cardImageInput = document.querySelector('.popup__input_type_mesto-image');
    
  function handleProfileFormSubmit (evt) {
    evt.preventDefault(); 
    userName.textContent = nameInput.value;
    userJob.textContent = jobInput.value;
    closeProfile();
  };  
    
  profileFormElement.addEventListener('submit', handleProfileFormSubmit);
    
        //Создание новой карточки//
  function createNewCard() {
    const mestoTemplate = document.querySelector('#mesto-item').content;
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
    deleteCard();
    likeCard();
  };
    
  mestoFormElement.addEventListener('submit', handleMestoFormSubmit);
}

document.addEventListener('DOMContentLoaded', function(){
   
  createInitialCards(initialCards);
  deleteCard();

  workPopup();
  




});

