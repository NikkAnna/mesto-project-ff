import './pages/index.css';
import { 
    initialCards 
} from './scripts/cards.js';
import { 
    createCard, 
    deleteCard, 
    addCard, 
    addLike, 
    placesList 
} from './scripts/card.js';
import { 
    openModal, 
    closeModal, 
    updateProfile, 
    updateEditProfileForm, 
    handleAddPlace, 
    clearNewPlaceForm, 
    createPopupImage 
} from './scripts/modal.js';

const popups = document.querySelectorAll('.popup');

const editProfileButton = document.querySelector('.profile__edit-button');
const editProfileFormPopup = document.querySelector('.popup_type_edit');
const editProfileForm = document.forms['edit-profile'];
const editProfileFormName = document.querySelector('.popup__input_type_name');
const editProfileFormDescription = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const newPlacePopup = document.querySelector('.popup_type_new-card');
const newPlaceButton = document.querySelector('.profile__add-button');
const newPlaceForm = document.forms['new-place'];
const newPlaceName = document.querySelector('.popup__input_type_card-name');
const newPlaceImage = document.querySelector('.popup__input_type_url');

initialCards.forEach(function(item) {
    const card = createCard(item.link, item.name, deleteCard, createPopupImage, addLike, item.description);
    addCard(card);
});

newPlaceForm.addEventListener(
    'submit', 
    (evt) => handleAddPlace(
        evt, newPlacePopup, newPlaceImage, newPlaceName, deleteCard, createPopupImage, addLike, placesList
    )
);

editProfileButton.addEventListener(
    'click', () => {
        updateEditProfileForm(
            editProfileFormName, editProfileFormDescription, profileTitle.textContent, profileDescription.textContent
        );
        openModal(editProfileFormPopup);
    }
);

editProfileForm.addEventListener(
    'submit',
    (evt) => updateProfile(
        evt, editProfileFormPopup, editProfileFormName.value, editProfileFormDescription.value, profileTitle, profileDescription
    )
);

newPlaceButton.addEventListener(
    'click', () => { 
        clearNewPlaceForm(newPlaceName, newPlaceImage);
        openModal(newPlacePopup);
    }
);

popups.forEach(function(popup) {
    popup.classList.add('popup_is-animated');

    popup.addEventListener('click', function(evt) {
        if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
            closeModal(popup);
        }
    });
});








