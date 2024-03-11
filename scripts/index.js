
const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

function deleteCard(card) {
  card.remove();
};

function createCard(link, name, deleteCard, description = 'красивая фотография') {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = link;
  cardImage.alt = description;

  cardElement.querySelector('.card__title').textContent = name;
  
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => deleteCard(cardElement));

  return cardElement;
}

function addCard(card) {
  placesList.append(card);
}

initialCards.forEach(function(item) {
  const card = createCard(item.link, item.name, deleteCard, item.description);
  addCard(card);
});
