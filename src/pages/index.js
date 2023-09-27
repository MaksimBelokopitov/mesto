import './index.css'
import  Card  from "../components/Card/Card.js";
import FormValidation from "../components/FormValidation/FormValidation.js";
import settingValidation from "../utils/settingValidation/settingValidation.js";
import Section from "../components/Section/Section.js";
import PopupWithForm from "../components/PopupWithForm/PopupWithForm.js";
import UserInfo from "../components/UserInfo/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage/PopupWithImage.js";
import PopupDelete from '../components/PopupDelete/PopupDelete';
import  Api from '../components/Api/Api.js';
import { 
  formList, 
  editButton,
  addButton,
  avatarButton, 
  apiOptions
 } from "../utils/constants.js";


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

let userId

  api.getPageData()
    .then(([userData, cardsData]) => {
      console.log(cardsData);
      userInfo.setUserInfo(userData);
      userInfo.setUserAvatar(userData.avatar);
      cardList.renderItems(cardsData, userData._id);
      userId = userData._id
    })

    .catch((err) => {
      console.log(`Ошибка.....: ${err}`);
    })

  const popupAvatar = new PopupWithForm('.popup_type_avatar', 
    {handleFormSubmit: (data) => {
      
      renderLoaiding(popupAvatar.button, true)
  
      api.setUserAvatar(data.avatar)
        .then((data) => {
          userInfo.setUserAvatar(data.avatar)
          popupAvatar.close()
        })
        .catch((err) => {
          console.log(`Ошибка.....: ${err}`);
        })      
        .finally(() =>{
          renderLoaiding(popupAvatar.button, false);
        })
    }
  })
  popupAvatar.setEventListener()

  avatarButton.addEventListener('click', ()=>{
    popupAvatar.open();
  })
 
const popupUser = new PopupWithForm ('.popup_type_profile',
{handleFormSubmit: (data) =>{
  renderLoaiding(popupUser.button, true)
  api.setUserInfo(data)
  .then((data) => {
    userInfo.setUserInfo(data);
  })
  .catch((err) => {
    console.log(`Ошибка.....: ${err}`);
  })  
  .finally(() => {
    renderLoaiding(popupUser.button, false);
    popupUser.close();
  })
  }
});
popupUser.setEventListener();

editButton.addEventListener('click', () => {
  popupUser.open();
  popupUser.setInputValues(userInfo.getUserInfo())
});

 const popupImage = new PopupWithImage('.popup_type_figure');

 function createCard(item, selector, userId){
  const card = new Card (userId, item, selector, 
    {handleCardClick: () => {
        popupImage.open(card.link, card.name,);
      }
    },
    {like: () => {
        api.likeCard(card.id)
        .then((data) => {
          card.likeCard()
          card.likeCounter(data);
        })
        .catch((err) => {
          console.log(`Ошибка.....: ${err}`);
        })  
      }
    },
    {dislike: () => {
      api.dislikeCard(card.id)
        .then((data) => {
          card.dislikeCard();
          card.likeCounter(data)
        })
        .catch((err) => {
          console.log(`Ошибка.....: ${err}`);
        })  
      }
    },
    {openDeletePopup: () => {
     deletePopup.open(card.id, card)
     }   
    }
  );
    const cardElement = card.generateCard();
    return cardElement;
 };

formList.forEach((form) => {
  const validation = new FormValidation( settingValidation, form);
  validation.enableValidation();
});

  const popupMesto = new PopupWithForm('.popup_type_mesto',
  {handleFormSubmit: (data) => {
    renderLoaiding(popupMesto.button, true)
    api.createNewCard(data)
    .then((data) => {
      cardList.addNewItem(createCard(data, '.mesto-template', userId));
      popupMesto.close();
    })
    .catch((err) => {
      console.log(`Ошибка.....: ${err}`);
    })  
    .finally(() => {
      renderLoaiding(popupMesto.button, false);
    })
  }});
  
  popupMesto.setEventListener()

  addButton.addEventListener('click', () => {
    popupMesto.open();
  });

  const deletePopup = new PopupDelete('.popup_type_delete', {
    handleFormSubmit: (id, card) =>{
      api.deleteCard(id)
      .then(() => {
        card.deleteCard()
        deletePopup.close();     
      })
      .catch((err) => {
        console.log(`Ошибка.....: ${err}`);
      })  
    }
  })

  deletePopup.setEventListener();
  
  


  
    
  
 
    
 






