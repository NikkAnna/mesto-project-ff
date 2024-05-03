import './pages/index.css';
import {
    createPlaceCard,
    deletePlaceCard
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
    updateProfileRequest,
    updateAvatarRequest,
    createPlaceRequest,
    getProfileRequest,
    getPlacesRequest,
    addPlaceLikeRequest,
    removePlaceLikeRequest
} from './scripts/api.js'

const popups = document.querySelectorAll('.popup');
const placesCards = document.querySelector('.places__list');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const profileAvatar = document.querySelector('.profile__image')
const popupAvatarEdit = document.querySelector('.popup_type_new-avatar')
const popupFormAvatarEdit = document.forms['new-avatar'];
const popupFormAvatarEditLink = document.querySelector('.popup__input_type_avatar_url');
const buttonChangeAvatar = popupAvatarEdit.querySelector('.popup__button');

const popupProfile = document.querySelector('.popup_type_edit');
const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
const popupProfileForm = document.forms['edit-profile'];
const popupProfileFormName = document.querySelector('.popup__input_type_name');
const popupProfileFormDescription = document.querySelector('.popup__input_type_description');
const buttonUpdatePopupProfile = popupProfile.querySelector('.popup__button');

const popupCreatePlace = document.querySelector('.popup_type_new-card');
const buttonOpenPopupCreatePlace = document.querySelector('.profile__add-button');
const popupCreatePlaceForm = document.forms['new-place'];
const popupCreatePlaceFormName = document.querySelector('.popup__input_type_card-name');
const popupCreatePlaceFormImage = document.querySelector('.popup__input_type_url');
const buttonCreatePlace = popupCreatePlace.querySelector('.popup__button');

const popupLargePlaceCard = document.querySelector('.popup_type_image');
const popupLargePlaceCardImage = popupLargePlaceCard.querySelector('.popup__image');
const popupLargePlaceCardText = popupLargePlaceCard.querySelector('.popup__caption');

const popupDeletePlaceCardForm = document.forms['delete-form'];
const popupDeletePlaceCard = document.querySelector('.popup_type_delete-card')

const urlSelfProfile = `${config.baseUrl}/users/me`;
const urlCards = `${config.baseUrl}/cards`;
const urlSelfAvatar = `${config.baseUrl}/users/me/avatar`;

function addPlaceCard(placeCard) {
    placesCards.append(placeCard);
}

function handlePlaceCardLike(evt, cardId, likeCounter) {

    evt.target.classList.toggle('card__like-button_is-active');

    if (evt.target.classList.contains('card__like-button_is-active')) {
        addPlaceLikeRequest(`${config.baseUrl}/cards/likes/${cardId}`, config)
            .then((data) => {
                likeCounter.textContent = data.likes.length
            }).catch((err) => {
                console.log(err);
            });
    } else {
        removePlaceLikeRequest(`${config.baseUrl}/cards/likes/${cardId}`, config)
            .then((data) => {
                likeCounter.textContent = data.likes.length
            }).catch((err) => {
                console.log(err);
            });
    }
}

function handleUpdateProfile(evt, popup, title, description, profileTitle, profileDescription) {
    evt.preventDefault();

    profileTitle.textContent = title;
    profileDescription.textContent = description;

    updateProfileRequest(urlSelfProfile, config, {
        name: profileTitle.textContent,
        about: profileDescription.textContent,
    })

    closeModal(popup);
}

function handleUpdateAvatar(evt, popup, urlMyAvatar, config, avatarLink, profileAvatar) {
    evt.preventDefault();

    updateAvatarRequest(urlMyAvatar, config, avatarLink)
        .then((data) => {
            profileAvatar.style.backgroundImage = `url(${data.avatar})`;
        })
        .catch((err) => {
            console.log(err);
        });

    closeModal(popup);
}

function updatePopupProfileForm(popupFormName, popupFormDescription, profileTitle, profileDescription) {
    popupFormName.value = profileTitle;
    popupFormDescription.value = profileDescription;
    buttonUpdatePopupProfile.textContent = 'Сохранить';
}

function clearPopupCreatePlaceForm(placeName, placeImage) {
    placeName.value = '';
    placeImage.value = '';
}

function clearPopupAvatarForm(link) {
    link.value = '';
}

function handleOpenPopupCreatePlace(evt, popup, placeImage, placeName, createPopupLargeCard, handlePlaceCardLike, placesCards, profile, handleConfirmPopupDelete, popupFormDelete, popupDelete) {
    evt.preventDefault();

    createPlaceRequest(urlCards, config, {
        name: placeName.value,
        link: placeImage.value,
    }).then((place) => {
        const card = createPlaceCard(placeImage.value, placeName.value, [], createPopupLargeCard, handlePlaceCardLike, place._id, profile._id, profile, handleConfirmPopupDelete, popupFormDelete, popupDelete);
        placesCards.prepend(card);
        closeModal(popup);
        clearPopupCreatePlaceForm(placeName, placeImage);
    }).catch((err) => {
        console.log(err);
    });
}

function createPopupLargePlaceCard(link, name, description) {
    popupLargePlaceCardImage.src = link;
    popupLargePlaceCardImage.alt = description;
    popupLargePlaceCardText.textContent = name;

    openModal(popupLargePlaceCard);
}

function handleConfirmPopupDelete(popupFormDelete, cardId, cardElement, popupDelete) {
    popupFormDelete.addEventListener('submit', (evt) => {
        evt.preventDefault();
        deletePlaceCard(cardElement, cardId);

        closeModal(popupDelete);
    })

    openModal(popupDelete);
}

function openPopupAvatarEditForm(popup) {
    openModal(popup)
}

Promise.all([
    getProfileRequest(urlSelfProfile, config),
    getPlacesRequest(urlCards, config)
]).then(([profile, placesData]) => {
    profileTitle.textContent = profile.name;
    profileDescription.textContent = profile.about;
    profileAvatar.style.backgroundImage = `url(${profile.avatar})`;

    popupCreatePlaceForm.addEventListener(
        'submit',
        (evt) => {
            handleOpenPopupCreatePlace(
                evt, popupCreatePlace, popupCreatePlaceFormImage, popupCreatePlaceFormName, createPopupLargePlaceCard, handlePlaceCardLike, placesCards, profile, handleConfirmPopupDelete, popupDeletePlaceCardForm, popupDeletePlaceCard
            )
            buttonCreatePlace.textContent = 'Создание...';
        });

    placesData.forEach((place) => {
        const placeCard = createPlaceCard(place.link, place.name, place.likes, createPopupLargePlaceCard, handlePlaceCardLike, place._id, profile._id, place.owner, handleConfirmPopupDelete, popupDeletePlaceCardForm, popupDeletePlaceCard)
        addPlaceCard(placeCard);
    })
}).catch((err) => {
    console.log(err);
});

profileAvatar.addEventListener('click', () => {
    clearPopupAvatarForm(popupFormAvatarEditLink);
    clearValidation(popupFormAvatarEdit, {
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible'
    });
    buttonChangeAvatar.textContent = 'Сохранить';
    openPopupAvatarEditForm(popupAvatarEdit);
})

popupFormAvatarEdit.addEventListener(
    'submit',
    (evt) => {
        handleUpdateAvatar(
            evt, popupAvatarEdit, urlSelfAvatar, config, popupFormAvatarEditLink.value, profileAvatar
        );
        buttonChangeAvatar.textContent = 'Сохранение...';
    })

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
    (evt) => {
        handleUpdateProfile(
            evt, popupProfile, popupProfileFormName.value, popupProfileFormDescription.value, profileTitle, profileDescription
        );
        buttonUpdatePopupProfile.textContent = 'Сохранение...';
    }
);

buttonOpenPopupCreatePlace.addEventListener(
    'click',
    () => {
        clearPopupCreatePlaceForm(popupCreatePlaceFormName, popupCreatePlaceFormImage);
        clearValidation(popupCreatePlaceForm, {
            inputSelector: '.popup__input',
            submitButtonSelector: '.popup__button',
            inactiveButtonClass: 'popup__button_disabled',
            inputErrorClass: 'popup__input_type_error',
            errorClass: 'popup__error_visible'
        });
        buttonCreatePlace.textContent = 'Создать';
        openModal(popupCreatePlace);
    }
);

popups.forEach(function (popup) {
    popup.classList.add('popup_is-animated');

    popup.addEventListener('click', (evt) => closeModalByOverlayAndCloseButton(evt, popup));
});

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});




