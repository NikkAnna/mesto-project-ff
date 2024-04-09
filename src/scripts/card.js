
const cardTemplate = document.querySelector('#card-template').content;

function deleteCard(card) {
    card.remove();
}

function createCard(link, name, deleteCard, createPopupLargeCard, addCardLike, description = 'красивая фотография') {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = link;
    cardImage.alt = description;

    cardElement.querySelector('.card__title').textContent = name;

    cardImage.addEventListener('click', () => createPopupLargeCard(link, name, description));
  
    const likebutton = cardElement.querySelector('.card__like-button');
    likebutton.addEventListener('click', (evt) => addCardLike(evt));
    
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => deleteCard(cardElement));
  
    return cardElement;
}

function addCardLike(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}

export { 
    createCard, 
    deleteCard, 
    addCardLike, 
    cardTemplate
}