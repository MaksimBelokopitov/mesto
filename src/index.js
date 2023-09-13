import './pages/index.css'
import  Card  from "./components/Card/Card.js";
import FormValidation from "./components/FormValidation/FormValidation.js";
import initialCards from "./utils/cards/cards.js";
import settingValidation from "./utils/settingValidation/settingValidation.js";
import Section from "./components/Section/Section.js";
import PopupWithForm from "./components/PopupWithForm/PopupWithForm.js";
import UserInfo from "./components/UserInfo/UserInfo.js";
import PopupWithImage from "./components/PopupWithImage/PopupWithImage.js";
import { 
  formList, 
  editButton,
  addButton,
 } from "./utils/constants.js";

 const popupImage = new PopupWithImage('.popup_type_figure');


 function createCard(item, selector){
  const card = new Card (item, selector, {
    handleCardClick: () => {
      popupImage.open(card._link,card._name);
    }
  });
    const cardElement = card.generateCard();
    return cardElement;
 }

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardList.addItem(createCard(item, '.mesto-template'));
  }
},
'.mesto__list'
);

cardList.renderItems();



formList.forEach((form) => {
  const validation = new FormValidation( settingValidation, form);
  validation.enableValidation();
})


//Попапы//


  //Попап редактирования профиля
  const userInfo = new UserInfo ({userSelector: '.profile__name', aboutSelector: '.profile__job'});

  const popupUser = new PopupWithForm ('.popup_type_profile',
  {handleFormSubmit: () =>{
    userInfo.setUserInfo(popupUser.inputValues);
    popupUser.close();
    }
  });
  popupUser.setEventListener();

  editButton.addEventListener('click', () => {
    popupUser.open();
    popupUser.setInputValues(userInfo.getUserInfo())
    
  });

  //Попап доваления карточки места
  const popupMesto = new PopupWithForm('.popup_type_mesto',
  {handleFormSubmit: () => {
    cardList.addNewItem(createCard(popupMesto.inputValues, '.mesto-template'));
    popupMesto.close();
  }});
  
  popupMesto.setEventListener()

  addButton.addEventListener('click', () => {
    popupMesto.open();
  });
    
  
 
    
 






