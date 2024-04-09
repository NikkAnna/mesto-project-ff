import './pages/index.css';
import { 
    initialCards 
} from './scripts/cards.js';
import { 
    createCard, 
    deleteCard, 
    addCardLike
} from './scripts/card.js';
import { 
    openModal, 
    closeModal,
    closeModalByOverlayAndCloseButton
} from './scripts/modal.js';

const popups = document.querySelectorAll('.popup');
const placesList = document.querySelector('.places__list');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const popupProfile = document.querySelector('.popup_type_edit');
const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
const popupProfileForm = document.forms['edit-profile'];
const popupProfileFormName = document.querySelector('.popup__input_type_name');
const popupProfileFormDescription = document.querySelector('.popup__input_type_description');

const popupNewPlace = document.querySelector('.popup_type_new-card');
const buttonOpenPopupNewPlace = document.querySelector('.profile__add-button');
const popupNewPlaceForm = document.forms['new-place'];
const popupNewPlaceFormName = document.querySelector('.popup__input_type_card-name');
const popupNewPlaceFormImage = document.querySelector('.popup__input_type_url');

const popupLargeCard = document.querySelector('.popup_type_image');
const popupLargeCardImage = popupLargeCard.querySelector('.popup__image');
const popupLargeCardText = popupLargeCard.querySelector('.popup__caption');

function addCard(card) {
    placesList.append(card);
}

function handleUpdateProfile(evt, popup, title, description, profileTitle, profileDescription) {
    evt.preventDefault();
  
    profileTitle.textContent = title;
    profileDescription.textContent = description;
  
    closeModal(popup);
}

function updatePopupProfileForm(popupFormName, popupFormDescription, profileTitle, profileDescription) {
    popupFormName.value = profileTitle;
    popupFormDescription.value = profileDescription;
}

function clearPopupNewPlaceForm(placeName, placeImage) {
    placeName.value = '';
    placeImage.value = '';
}

function handleOpenPopupNewPlace(evt, popup, placeImage, placeName, deleteCard, createPopupImage, addCardLike, placesList) {
    evt.preventDefault();
  
    const card = createCard(placeImage.value, placeName.value, deleteCard, createPopupImage, addCardLike);
    placesList.prepend(card);
  
    closeModal(popup);
  
    clearPopupNewPlaceForm(placeName, placeImage);
}

function createPopupLargeCard(link, name, description) {
    popupLargeCardImage.src = link;
    popupLargeCardImage.alt = description;
    popupLargeCardText.textContent = name;

    openModal(popupLargeCard);
}

initialCards.forEach(function(item) {
    const card = createCard(item.link, item.name, deleteCard, createPopupLargeCard, addCardLike, item.description);
    addCard(card);
});

popupNewPlaceForm.addEventListener(
    'submit', 
    (evt) => handleOpenPopupNewPlace(
        evt, popupNewPlace, popupNewPlaceFormImage, popupNewPlaceFormName, deleteCard, createPopupLargeCard, addCardLike, placesList
    )
);

buttonOpenPopupProfile.addEventListener(
    'click',
    () => {
        updatePopupProfileForm(
            popupProfileFormName, popupProfileFormDescription, profileTitle.textContent, profileDescription.textContent
        );
        openModal(popupProfile);
    }
);

popupProfileForm.addEventListener(
    'submit',
    (evt) => handleUpdateProfile(
        evt, popupProfile, popupProfileFormName.value, popupProfileFormDescription.value, profileTitle, profileDescription
    )
);

buttonOpenPopupNewPlace.addEventListener(
    'click',
    () => { 
        clearPopupNewPlaceForm(popupNewPlaceFormName, popupNewPlaceFormImage);
        openModal(popupNewPlace);
    }
);

popups.forEach(function(popup) {
    popup.classList.add('popup_is-animated');

    popup.addEventListener('click', (evt) => closeModalByOverlayAndCloseButton(evt, popup))
});
