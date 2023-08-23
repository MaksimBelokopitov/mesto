const mestoList = document.querySelector('.mesto__list');
const mestoTemplate = document.querySelector('#mesto-item').content;

function createCard(item) {
  const mestoCard = mestoTemplate.querySelector('.mesto__item').cloneNode(true);

  const mestoPicture = mestoCard.querySelector('.mesto__image');
  mestoPicture.alt = item.name;
  mestoPicture.src = item.link;

  const mestoName = mestoCard.querySelector('.mesto__title');
  mestoName.textContent = item.name;

  const deleteButton = mestoCard.querySelector(".mesto__delete-button");
  deleteButton.addEventListener("click", deleteCard);

  const likeButton = mestoCard.querySelector('.mesto__like-button');
  likeButton.addEventListener("click", likeCard);

  mestoPicture.addEventListener('click', () => {
      figureImage.src = mestoPicture.src;
      figureImage.alt = mestoPicture.alt;
      figureCaption.textContent = mestoPicture.alt;
      openPopup(figureWindow)
    });
  return  mestoCard
};

function createInitialCards(arr) {
  for (let i = 0; i < arr.length; i++){
  const mestoElement = createCard(arr[i]); 
  mestoList.append(mestoElement); 
  };
};