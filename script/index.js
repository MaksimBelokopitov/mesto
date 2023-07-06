
document.addEventListener('DOMContentLoaded', function(){
   
    let openButton = document.querySelector('.profile__edit-button');
    let popupWindow = document.querySelector('.popup');
    let popupCloseButton = document.querySelector('.popup__button-close');
    let userName = document.querySelector('.profile__name');
    let userJob = document.querySelector('.profile__job');
    let formElement = document.querySelector('.popup__container');
    let arrInput = formElement.querySelectorAll('.popup__input');
    let nameInput = arrInput[0];
    let jobInput = arrInput[1];
    let formButton = formElement.querySelector('.popup__button');
    let likeButtons = Array.from(document.querySelectorAll('.mesto__like-button'));

    openButton.addEventListener('click', function(){
        popupWindow.classList.add('popup_opened');
        nameInput.value = userName.textContent;
        jobInput.value = userJob.textContent;
    });

    function closePopup() {
        popupWindow.classList.remove('popup_opened');
    };

    popupCloseButton.addEventListener('click', function(evt){
        evt.preventDefault();
        closePopup();
    });

    function handleFormSubmit (evt) {
        evt.preventDefault(); 
        userName.textContent = nameInput.value;
        userJob.textContent = jobInput.value;
        closePopup();
    };  

    formElement.addEventListener('submit', handleFormSubmit)
     
   
    for( let i = 0; i < 6; i++){
        likeButtons[i].onclick = function(){
            likeButtons[i].classList.toggle('mesto__like-button_active')
        }
    }  
    
});

