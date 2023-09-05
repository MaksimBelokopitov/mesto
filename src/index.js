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

const cardList = new Section({
  items: initialCards,
  renderer: (item) =>{
    const card = new Card (item, '.mesto-template', {
      handleCardClick: () => {
        card._popup = new PopupWithImage('.popup_type_figure', card._link,card._name);
        card._popup.open();
      }
    });
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
},
'.mesto__list'
);

cardList.renderItems()


formList.forEach((form) => {
  const validation = new FormValidation( settingValidation, form);
  validation.enableValidation();
})


//Попапы//


  //Попап редактирования профиля
  const userInfo = new UserInfo ({userSelector: '.profile__name', aboutSelector: '.profile__job'});

  const popupUser = new PopupWithForm ('.popup_type_profile',
  {handleFormSubmit: () =>{
    userInfo.setUserInfo(popupUser._inputValues);
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
    const card = new Card(popupMesto._inputValues, '.mesto-template', {
      handleCardClick: () => {
        card._popup = new PopupWithImage('.popup_type_figure', card._link,card._name);
        card._popup.open();
      }
    });
    const cardElement = card.generateCard();
    cardList.addNewItem(cardElement);
    popupMesto.close();
  }});
  popupMesto.setEventListener()

  addButton.addEventListener('click', () => {
    popupMesto.open();
  });
    
  
 
    
 






