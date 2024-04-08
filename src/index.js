import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createCard, deleteCard, addCard, addLike, cardTemplate, placesList } from './scripts/card.js';
import { openModal, closeModal, closeModalEsc, changeUserInformation, updateEditForm, addPlace, updateNewPlaceForm, createPopupImage } from './scripts/modal.js';

const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const newButton = document.querySelector('.profile__add-button');
const popups = document.querySelectorAll('.popup');
const editForm = document.forms['edit-profile'];
const editFormName = document.querySelector('.popup__input_type_name');
const editFormDescription = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const newPlaceForm = document.forms['new-place'];
const placeName = document.querySelector('.popup__input_type_card-name');
const placeImage = document.querySelector('.popup__input_type_url');

initialCards.forEach(function(item) {
  const card = createCard(item.link, item.name, deleteCard, createPopupImage, addLike, item.description);
  addCard(card);
});

newPlaceForm.addEventListener('submit', (evt) => addPlace(evt, newCardPopup));

editForm.addEventListener('submit', (evt) => changeUserInformation(evt, editPopup));

editButton.addEventListener('click', () => {
  updateEditForm();
  openModal(editPopup);
});

newButton.addEventListener('click', () => { 
  updateNewPlaceForm();
  openModal(newCardPopup);
});

popups.forEach(function(popup) {
  popup.classList.add('popup_is-animated');

  popup.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
      closeModal(popup);
      }
    });
  });


export { editFormName, editFormDescription, profileTitle, profileDescription, placeImage, placeName }










