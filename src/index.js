import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createCard, deleteCard, addCard, createPopupImage, addLike, cardTemplate, placesList } from './scripts/card.js';

const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const newButton = document.querySelector('.profile__add-button');
const popups = document.querySelectorAll('.popup');

initialCards.forEach(function(item) {
  const card = createCard(item.link, item.name, deleteCard, createPopupImage, addLike, item.description);
  addCard(card);
});

export function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', (evt) => {
    closeModalEsc(evt, popup);
  });
};

function closeModalEsc(evt, popup){
  if (evt.key === 'Escape') {
      closeModal(popup);
    }
};

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeModalEsc);
};

const editForm = document.forms['edit-profile'];
const editFormName = document.querySelector('.popup__input_type_name');
const editFormDescription = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const newPlaceForm = document.forms['new-place'];
const placeName = document.querySelector('.popup__input_type_card-name');
const placeImage = document.querySelector('.popup__input_type_url');

function changeUserInformation(evt, popup) {
  evt.preventDefault();

  const formNameValue = editFormName.value;
  const FormDescriptionValue = editFormDescription.value

  profileTitle.textContent = formNameValue;
  profileDescription.textContent = FormDescriptionValue;

  closeModal(popup);
}

function updateEditForm() {
  editFormName.value = profileTitle.textContent;
  editFormDescription.value = profileDescription.textContent;
}

function updateNewPlaceForm() {
  placeName.value = '';
  placeImage.value = '';
}

function addPlace(evt, popup) {
  evt.preventDefault();

  const card = createCard(placeImage.value, placeName.value, deleteCard, createPopupImage, addLike);
  placesList.prepend(card);

  closeModal(popup);

  updateNewPlaceForm();
}

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











