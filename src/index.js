import './pages/index.css';
// import { 
//     initialCards 
// } from './scripts/cards.js';
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
import {
    enableValidation,
    clearValidation
} from './scripts/validation.js'
import {
    config,
    getRequest,
    postRequest,
    patchRequest
} from './scripts/api.js'

const popups = document.querySelectorAll('.popup');
const placesList = document.querySelector('.places__list');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image')

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

const urlMyProfile = config.baseUrl + '/users/me';
const urlCards = config.baseUrl + '/cards';


function addCard(card) {
    placesList.append(card);
}

function handleUpdateProfile(evt, popup, title, description, profileTitle, profileDescription) {
    evt.preventDefault();
  
    profileTitle.textContent = title;
    profileDescription.textContent = description;

    patchRequest(urlMyProfile, config, {
        name: profileTitle.textContent,
        about: profileDescription.textContent,
    })

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

    postRequest(urlCards, config, {
        name: placeName.value,
        link: placeImage.value,
    }).then((data) => {
        console.log(data)
    })

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

// initialCards.forEach(function(item) {
//     const card = createCard(item.link, item.name, deleteCard, createPopupLargeCard, addCardLike, item.description);
//     addCard(card);
// });

Promise.all([
    getRequest(urlMyProfile, config),
    getRequest(urlCards, config)
]).then(([profileData, cardsData]) => {
    // console.log({profileData, cardsData})
    profileTitle.textContent = profileData.name;
    profileDescription.textContent = profileData.about;
    profileAvatar.style.backgroundImage = `url(${profileData.avatar})`;

    cardsData.forEach((card) => {
        const cardItem = createCard(card.link, card.name, deleteCard, createPopupLargeCard, addCardLike)
        addCard(cardItem);
    })
})


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
        clearValidation(popupProfileForm, {
            inputSelector: '.popup__input',
            submitButtonSelector: '.popup__button',
            inactiveButtonClass: 'popup__button_disabled',
            inputErrorClass: 'popup__input_type_error',
            errorClass: 'popup__error_visible'
          })
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
        clearValidation(popupNewPlaceForm, {
            inputSelector: '.popup__input',
            submitButtonSelector: '.popup__button',
            inactiveButtonClass: 'popup__button_disabled',
            inputErrorClass: 'popup__input_type_error',
            errorClass: 'popup__error_visible'
          })
        openModal(popupNewPlace);
    }
);

popups.forEach(function(popup) {
    popup.classList.add('popup_is-animated');

    popup.addEventListener('click', (evt) => closeModalByOverlayAndCloseButton(evt, popup))
});

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});




// getRequest(urlMyProfile, config)
// .then((data) => {
//     profileTitle.textContent = data.name;
//     profileDescription.textContent = data.about;
//     profileAvatar.style.backgroundImage = `url(${data.avatar})`;
// })


