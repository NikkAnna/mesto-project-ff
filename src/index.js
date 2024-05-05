import './pages/index.css';
import {
    createPlaceCard,
    deletePlaceCard,
    addPlaceCardLike,
    removePlaceCardLike,
    countPlaceCardLikes
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
const popupDeletePlaceCard = document.querySelector('.popup_type_delete-card');

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
};


function addPlaceCard(placeCard) {
    placesCards.append(placeCard);
}

function handleTogglePlaceCardLike(evt, placeCardId, likeCounter) {

    if (evt.target.classList.contains('card__like-button_is-active')) {
        removePlaceLikeRequest(placeCardId)
            .then((data) => {
                countPlaceCardLikes(likeCounter, data)
                removePlaceCardLike(evt.target);
            }).catch((err) => {
                console.log(err);
        });

    } else {
        addPlaceLikeRequest(placeCardId)
            .then((data) => {
                countPlaceCardLikes(likeCounter, data)
                addPlaceCardLike(evt.target);
            }).catch((err) => {
                console.log(err);
            });
    };
}

function updatePopupProfileForm(popupFormName, popupFormDescription, profileTitle, profileDescription) {
    popupFormName.value = profileTitle;
    popupFormDescription.value = profileDescription;
}

function handleUpdateProfile(evt, popup, title, description, profileTitle, profileDescription) {
    evt.preventDefault();

    updateProfileRequest({
        name: title.value,
        about: description.value,
    })
        .then((data) => {
            profileTitle.textContent = data.name;
            profileDescription.textContent = data.about;
            closeModal(popup);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            buttonUpdatePopupProfile.textContent = 'Сохранить';
        })
}

function handleUpdateAvatar(evt, popup, avatarLink, profileAvatar) {
    evt.preventDefault();

    updateAvatarRequest(avatarLink)
        .then((data) => {
            profileAvatar.style.backgroundImage = `url(${data.avatar})`;
            closeModal(popup);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            buttonChangeAvatar.textContent = 'Сохранить';
        });
}

function clearPopupAvatarForm(link) {
    link.value = '';
}


function openPopupAvatarEditForm(popup) {
    openModal(popup);
}

function clearPopupCreatePlaceForm(placeName, placeImage) {
    placeName.value = '';
    placeImage.value = '';
}

function handleOpenPopupCreatePlace(evt, popup, placeImage, placeName, createPopupLargeCard, handleTogglePlaceCardLike, placesCards, profile, handleOpenPopupDelete, popupDelete) {
    evt.preventDefault();

    createPlaceRequest({
        name: placeName.value,
        link: placeImage.value,
    }).then((place) => {
        const card = createPlaceCard(place, profile._id, createPopupLargeCard, handleTogglePlaceCardLike, handleOpenPopupDelete, popupDelete);
        placesCards.prepend(card);
        closeModal(popup);
    }).catch((err) => {
        console.log(err);
    }).finally(() => {
        buttonCreatePlace.textContent = 'Создать';
    })
}

function createPopupLargePlaceCard(link, name) {
    popupLargePlaceCardImage.src = link;
    popupLargePlaceCardText.textContent = name;

    openModal(popupLargePlaceCard);
}

let handleSubmitConfirmPopup = () => { };

function handleOpenPopupDelete(cardId, cardElement, popupDelete) {
    openModal(popupDelete);

    handleSubmitConfirmPopup = (evt) => {
        evt.preventDefault();
        deletePlaceCard(cardElement, cardId);

        closeModal(popupDelete);
    };
}

let selfProfile = {};

Promise.all([
    getProfileRequest(),
    getPlacesRequest()
]).then(([profile, placesData]) => {
    selfProfile = profile;
    profileTitle.textContent = profile.name;
    profileDescription.textContent = profile.about;
    profileAvatar.style.backgroundImage = `url(${profile.avatar})`;

    placesData.forEach((place) => {
        const placeCard = createPlaceCard(place, profile._id, createPopupLargePlaceCard, handleTogglePlaceCardLike, handleOpenPopupDelete, popupDeletePlaceCard)
        addPlaceCard(placeCard);
    })
}).catch((err) => {
    console.log(err);
});

popupDeletePlaceCardForm.addEventListener('submit', (evt) => {
    handleSubmitConfirmPopup(evt);
})

popupCreatePlaceForm.addEventListener(
    'submit',
    (evt) => {
        handleOpenPopupCreatePlace(
            evt, popupCreatePlace, popupCreatePlaceFormImage, popupCreatePlaceFormName, createPopupLargePlaceCard, handleTogglePlaceCardLike, placesCards, selfProfile, handleOpenPopupDelete, popupDeletePlaceCard
        );
        buttonCreatePlace.textContent = 'Создание...';
    });

profileAvatar.addEventListener('click', () => {
    clearPopupAvatarForm(popupFormAvatarEditLink);
    clearValidation(popupFormAvatarEdit, validationConfig);
    openPopupAvatarEditForm(popupAvatarEdit);
})

popupFormAvatarEdit.addEventListener(
    'submit',
    (evt) => {
        handleUpdateAvatar(
            evt, popupAvatarEdit, popupFormAvatarEditLink.value, profileAvatar
        );
        buttonChangeAvatar.textContent = 'Сохранение...';
    })

buttonOpenPopupProfile.addEventListener(
    'click',
    () => {
        updatePopupProfileForm(
            popupProfileFormName, popupProfileFormDescription, profileTitle.textContent, profileDescription.textContent
        );
        clearValidation(popupProfileForm, validationConfig);
        openModal(popupProfile);
    }
);

popupProfileForm.addEventListener(
    'submit',
    (evt) => {
        handleUpdateProfile(
            evt, popupProfile, popupProfileFormName, popupProfileFormDescription, profileTitle, profileDescription
        );
        buttonUpdatePopupProfile.textContent = 'Сохранение...';
    }
);

buttonOpenPopupCreatePlace.addEventListener(
    'click',
    () => {
        clearPopupCreatePlaceForm(popupCreatePlaceFormName, popupCreatePlaceFormImage);
        clearValidation(popupCreatePlaceForm, validationConfig);
        openModal(popupCreatePlace);
    }
);

popups.forEach(function (popup) {
    popup.classList.add('popup_is-animated');

    popup.addEventListener('click', (evt) => closeModalByOverlayAndCloseButton(evt, popup));
});

enableValidation(validationConfig);




