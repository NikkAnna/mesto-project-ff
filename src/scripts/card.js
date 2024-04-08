import { 
    createPopupImage 
} from "./modal";

const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

function deleteCard(card) {
    card.remove();
}

function createCard(link, name, deleteCard, createPopupImage, addLike, description = 'красивая фотография') {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = link;
    cardImage.alt = description;

    cardElement.querySelector('.card__title').textContent = name;

    cardImage.addEventListener('click', () => createPopupImage(link, name, description));
  
    const likebutton = cardElement.querySelector('.card__like-button');
    likebutton.addEventListener('click', (evt) => addLike(evt));
    
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => deleteCard(cardElement));
  
    return cardElement;
}

function addLike(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}

function addCard(card) {
    placesList.append(card);
}

export { 
    createCard, 
    deleteCard, 
    addCard, 
    createPopupImage, 
    addLike, 
    cardTemplate, 
    placesList 
}