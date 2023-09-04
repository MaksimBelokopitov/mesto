import  Card  from "../components/Card/Card.js";
import FormValidation from "../components/FormValidation/FormValidation.js";
import initialCards from "../utils/cards/cards.js";
import settingValidation from "../utils/settingValidation/settingValidation.js";
import Section from "../components/Section/Section.js";
import { popupList, 
  mestoList, 
  formList, 
  editButton,
  nameInput,
  jobInput,
  addButton,
  mestoWindow,
  profileFormElement,
  mestoFormElement,
  cardNameInput,
  cardImageInput ,
userJob,
userName } from "../utils/constants.js";
import PopupWithForm from "../components/PopupWithForm/PopupWithForm.js";



const cardList = new Section({
  items: initialCards,
  renderer: (item) =>{
    const card = new Card (item, '.mesto-template');
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
},
  mestoList
);

cardList.renderItems()


formList.forEach((form) => {
  const validation = new FormValidation( settingValidation, form);
  validation.enableValidation();
})


//Попапы//


  //Попап редактирования профиля
 
  const popupUser = new PopupWithForm ('.popup_type_profile',
  {handleFormSubmit: (data) =>{
    userJob.textContent = data.about;
    userName.textContent = data.user;
    popupUser.close();
  }
  });
 

  editButton.addEventListener('click', () => {
   
    popupUser.open();
    popupUser.setEventListener();
  });

  //Попап доваления карточки места
  const popupMesto = new PopupWithForm('.popup_type_mesto',
  {handleFormSubmit: (data) => {
    const card = new Card(data, '.mesto-template');
    const cardElement = card.generateCard();
    cardList.addNewItem(cardElement);
    popupMesto.close();
  }});
 

  addButton.addEventListener('click', () => {
   
    popupMesto.open();
    popupMesto.setEventListener()
  });
    
  
 
    
 






