
document.addEventListener('DOMContentLoaded', function(){
   
    const editButton = document.querySelector('.profile__edit-button');
    const addButton = document.querySelector('.profile__add-button');
    const profileWindow = document.querySelector('.popup_type_profile');
    const mestoWindow = document.querySelector('.popup_type_mesto');
    const profileCloseButton = document.querySelector('.popup__button-close_type_profile');
    const mestoCloseButton = document.querySelector('.popup__button-close_type_mesto');
    const userName = document.querySelector('.profile__name');
    const userJob = document.querySelector('.profile__job');
    const profileFormElement = document.querySelector('.popup__form_type_profile');
    const mestoFormElement = document.querySelector('.popup__form_type_mesto');
    const nameInput = document.querySelector('.popup__input_type_user-name')
    const jobInput = document.querySelector('.popup__input_type_user-job')

    editButton.addEventListener('click', () => {
        profileWindow.classList.add('popup_opened');
        nameInput.value = userName.textContent;
        jobInput.value = userJob.textContent;
    });

    addButton.addEventListener('click', () => {
        mestoWindow.classList.add('popup_opened');
    });

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

    function handleProfileFormSubmit (evt) {
        evt.preventDefault(); 
        userName.textContent = nameInput.value;
        userJob.textContent = jobInput.value;
        closeProfile();
    };  

    profileFormElement.addEventListener('submit', handleProfileFormSubmit)
});

