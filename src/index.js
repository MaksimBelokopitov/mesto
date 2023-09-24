import './pages/index.css'
import  Card  from "./components/Card/Card.js";
import FormValidation from "./components/FormValidation/FormValidation.js";
import settingValidation from "./utils/settingValidation/settingValidation.js";
import Section from "./components/Section/Section.js";
import PopupWithForm from "./components/PopupWithForm/PopupWithForm.js";
import UserInfo from "./components/UserInfo/UserInfo.js";
import PopupWithImage from "./components/PopupWithImage/PopupWithImage.js";
import PopupDelete from './components/PopupDelete/PopupDelete';
import  Api from './components/Api/Api.js';
import { 
  formList, 
  editButton,
  addButton,
  avatarButton, 
  apiOptions
 } from "./utils/constants.js";

function renderLoaiding(popupButton, isLoading) {
  if (isLoading) {
    popupButton.textContent = 'Сохранение...'
  }
  else{
    popupButton.textContent = 'Сохранение'
  }
};

 const userInfo = new UserInfo ({userSelector: '.profile__name', aboutSelector: '.profile__job', avatarSelector: '.profile__avatar'});
 const api = new Api(apiOptions); 
 
 const cardList = new Section({
  renderer: (item, userId) => {
    cardList.addItem(createCard(item, '.mesto-template', userId));
  }
},
'.mesto__list'
);


  api.getPageData()
  .then(([userData, cardsData]) => {
    console.log(userData);
    console.log(cardsData);
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData.avatar);
    cardList.renderItems(cardsData, userData._id);
  })


  const popupAvatar = new PopupWithForm('.popup_type_avatar', 
    {handleFormSubmit: () => {
      renderLoaiding(popupAvatar.button, true)
      api.setUserAvatar(popupAvatar.inputValues.avatar)
        .then((data) => {
          userInfo.setUserAvatar(data.avatar)
        })
        .finally(() =>{
          renderLoaiding(popupAvatar.button, false)
        })
      popupAvatar.close()
    }
  })
  popupAvatar.setEventListener()

  avatarButton.addEventListener('click', ()=>{
    popupAvatar.open();
  })

//Попап редактирования профиля
 
const popupUser = new PopupWithForm ('.popup_type_profile',
{handleFormSubmit: () =>{
  renderLoaiding(popupUser.button, true)
  api.setUserInfo(popupUser.inputValues)
  .then((data) => {
    userInfo.setUserInfo(data)
  })
  .finally(() => {
    renderLoaiding(popupUser.button, false)
  })
  popupUser.close()
  }
});
popupUser.setEventListener();

editButton.addEventListener('click', () => {
  popupUser.open();
  popupUser.setInputValues(userInfo.getUserInfo())
  
});

 const popupImage = new PopupWithImage('.popup_type_figure');


 function createCard(item, selector, userId){
  const card = new Card (userId,item, selector, 
    {handleCardClick: () => {
        popupImage.open(card.link, card.name,);
      }
    },
    {like: () => {
        api.likeCard(card.id)
        .then((data) => {
          card.likeCounter(data)
        });
      }
    },
    {dislike: () => {
      api.dislikeCard(card.id)
        .then((data) => {
          card.likeCounter(data)
        })
      }
    },
    {openDeletePopup: () => {
     deletePopup.open(card.id, card.element)
      deletePopup.setEventListener()
    }
  });
    const cardElement = card.generateCard();
    return cardElement;
 }

formList.forEach((form) => {
  const validation = new FormValidation( settingValidation, form);
  validation.enableValidation();
})

  const popupMesto = new PopupWithForm('.popup_type_mesto',
  {handleFormSubmit: () => {
    renderLoaiding(popupMesto.button, true)
    api.createNewCard(popupMesto.inputValues)
    .then((data) => {
      cardList.addNewItem(createCard(data, '.mesto-template', cardList.userId));
    })
    .finally(() => {
      renderLoaiding(popupMesto.button, false)
    })
    popupMesto.close();
  }});
  
  popupMesto.setEventListener()

  addButton.addEventListener('click', () => {
    popupMesto.open();
  });


  const deletePopup = new PopupDelete('.popup_type_delete', {
    handleFormSubmit: (card, id) =>{
      api.deleteCard(id)
      .then(() => {
        card.remove();
        card = null
      })
    }
  })
  


  
    
  
 
    
 






