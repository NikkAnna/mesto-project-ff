//функции, связанные с открытием/ закрытием модальных окон,
//обновлением и добавлением информации о пользователей в модальном окне

import { createCard, placesList, deleteCard, addLike } from "./card";
import { editFormName, editFormDescription, profileTitle, profileDescription, placeImage, placeName } from "../index";

function openModal(popup) {
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

function changeUserInformation(evt, popup) {
    evt.preventDefault();
  
    const formNameValue = editFormName.value;
    const FormDescriptionValue = editFormDescription.value;
  
    profileTitle.textContent = formNameValue;
    profileDescription.textContent = FormDescriptionValue;
  
    closeModal(popup);
};

function updateEditForm() {
    editFormName.value = profileTitle.textContent;
    editFormDescription.value = profileDescription.textContent;
};

function updateNewPlaceForm() {
    placeName.value = '';
    placeImage.value = '';
};

function addPlace(evt, popup) {
    evt.preventDefault();
  
    const card = createCard(placeImage.value, placeName.value, deleteCard, createPopupImage, addLike);
    placesList.prepend(card);
  
    closeModal(popup);
  
    updateNewPlaceForm();
};

function createPopupImage(link, name, description) {
    const imagePopup = document.querySelector('.popup_type_image');
    const image = imagePopup.querySelector('.popup__image');
    const text = imagePopup.querySelector('.popup__caption');
    image.src = link;
    image.alt = description;
    text.textContent = name;
        
    openModal(imagePopup);
};

export { openModal, closeModal, closeModalEsc, addPlace, updateEditForm, updateNewPlaceForm, changeUserInformation, createPopupImage }