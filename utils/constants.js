

export const popupList = Array.from(document.querySelectorAll('.popup'));

export const mestoList = '.mesto__list';

export const formList = document.querySelectorAll('.popup__form');

export const editButton = document.querySelector('.profile__edit-button');
export const profileWindow = document.querySelector('.popup_type_profile');
export const userName = document.querySelector('.profile__name');
export const userJob = document.querySelector('.profile__job');

export const addButton = document.querySelector('.profile__add-button');
export const mestoWindow = document.querySelector('.popup_type_mesto');

export const profileFormElement = document.forms['profile'];
export const nameInput = profileFormElement.querySelector('.popup__input_type_user-name');
export const jobInput = profileFormElement.querySelector('.popup__input_type_user-job');


export const mestoFormElement = document.forms['mesto'];
export const cardNameInput = mestoFormElement.querySelector('.popup__input_type_mesto-name');
export const cardImageInput = mestoFormElement.querySelector('.popup__input_type_mesto-image'); 