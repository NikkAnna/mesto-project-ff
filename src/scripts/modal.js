//функции, связанные с открытием/ закрытием модальных окон,
//обновлением и добавлением информации о пользователей в модальном окне

import { 
    createCard
} from "./card";

function openModal(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', (evt) => {
      closeModalEsc(evt, popup);
    });
}
  
function closeModalEsc(evt, popup){
    if (evt.key === 'Escape') {
        closeModal(popup);
    }
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeModalEsc);
}

function updateProfile(evt, popup, title, description, profileTitle, profileDescription) {
    evt.preventDefault();
  
    profileTitle.textContent = title;
    profileDescription.textContent = description;
  
    closeModal(popup);
}

function updateEditProfileForm(editFormName, editFormDescription, profileTitle, profileDescription) {
    editFormName.value = profileTitle;
    editFormDescription.value = profileDescription;
}

function clearNewPlaceForm(placeName, placeImage) {
    placeName.value = '';
    placeImage.value = '';
}

function handleAddPlace(evt, popup, placeImage, placeName, deleteCard, createPopupImage, addLike, placesList) {
    evt.preventDefault();
  
    const card = createCard(placeImage.value, placeName.value, deleteCard, createPopupImage, addLike);
    placesList.prepend(card);
  
    closeModal(popup);
  
    clearNewPlaceForm(placeName, placeImage);
}

function createPopupImage(link, name, description) {
    const imagePopup = document.querySelector('.popup_type_image');
    const image = imagePopup.querySelector('.popup__image');
    const text = imagePopup.querySelector('.popup__caption');
    image.src = link;
    image.alt = description;
    text.textContent = name;
        
    openModal(imagePopup);
}

export { 
    openModal, 
    closeModal, 
    closeModalEsc, 
    handleAddPlace, 
    updateEditProfileForm, 
    clearNewPlaceForm, 
    updateProfile, 
    createPopupImage 
}