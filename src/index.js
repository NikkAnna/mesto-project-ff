import './pages/index.css';
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
    patchRequest,
    headRequest
} from './scripts/api.js'

const popups = document.querySelectorAll('.popup');
const placesList = document.querySelector('.places__list');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const profileAvatar = document.querySelector('.profile__image')
const popupAvatarEdit = document.querySelector('.popup_type_new-avatar')
const popupFormAvatarEdit = document.forms['new-avatar'];
const popupFormAvatarEditLink = document.querySelector('.popup__input_type_avatar_url');
const buttonSaveNewAvatar = popupAvatarEdit.querySelector('.popup__button')

const popupProfile = document.querySelector('.popup_type_edit');
const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
const popupProfileForm = document.forms['edit-profile'];
const popupProfileFormName = document.querySelector('.popup__input_type_name');
const popupProfileFormDescription = document.querySelector('.popup__input_type_description');
const buttonSavePopupProfile = popupProfile.querySelector('.popup__button');

const popupNewPlace = document.querySelector('.popup_type_new-card');
const buttonOpenPopupNewPlace = document.querySelector('.profile__add-button');
const popupNewPlaceForm = document.forms['new-place'];
const popupNewPlaceFormName = document.querySelector('.popup__input_type_card-name');
const popupNewPlaceFormImage = document.querySelector('.popup__input_type_url');
const buttonSaveNewPlace = popupNewPlace.querySelector('.popup__button')

const popupLargeCard = document.querySelector('.popup_type_image');
const popupLargeCardImage = popupLargeCard.querySelector('.popup__image');
const popupLargeCardText = popupLargeCard.querySelector('.popup__caption');

const popupFormDeleteCard = document.forms['delete-form'];
const popupDeleteCard = document.querySelector('.popup_type_delete-card')

const urlMyProfile = config.baseUrl + '/users/me';
const urlCards = config.baseUrl + '/cards';
const urlMyAvatar = config.baseUrl + '/users/me/avatar';


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
    .catch((err) => {
        console.log(err);
    }); 

    closeModal(popup);
}

function handleUpdateAvatar(evt, popup, urlMyAvatar, config, avatarLink, profileAvatar) {
    evt.preventDefault();

    patchRequest(urlMyAvatar, config, {
        avatar: avatarLink,
    })
    .then((data) => {
        profileAvatar.style.backgroundImage = `url(${data.avatar})`;
     })
    .catch((err) => {
        console.log(err);
    });

    // Promise.all([
    //     patchRequest(urlMyAvatar, config, {
    //         avatar: avatarLink,
    //     }),
    //     headRequest(avatarLink, config)
    // ])
    // .then(([avatar, data]) => {
    //     console.log([avatar, data.headers])
    // })
    // .catch((err) => {
    //     console.log(err);
    // });

    closeModal(popup);
}

function updatePopupProfileForm(popupFormName, popupFormDescription, profileTitle, profileDescription) {
    popupFormName.value = profileTitle;
    popupFormDescription.value = profileDescription;
    buttonSavePopupProfile.textContent = 'Сохранить'
}

function clearPopupNewPlaceForm(placeName, placeImage) {
    placeName.value = '';
    placeImage.value = '';
}

function clearPopupAvatarForm(link) {
    link.value = '';
}

function handleOpenPopupNewPlace(evt, popup, placeImage, placeName, createPopupLargeCard, addCardLike, placesList, profile, handleConfirmPopupDelete, popupFormDelete, popupDelete) {
    evt.preventDefault();
  
    postRequest(urlCards, config, {
        name: placeName.value,
        link: placeImage.value,
    }).then((data) => {
        const card = createCard(placeImage.value, placeName.value, [], createPopupLargeCard, addCardLike, data._id, profile._id, profile, handleConfirmPopupDelete, popupFormDelete, popupDelete);
        placesList.prepend(card);
        closeModal(popup);
        clearPopupNewPlaceForm(placeName, placeImage);
    }).catch((err) => {
        console.log(err);
    }); 
}

function createPopupLargeCard(link, name, description) {
    popupLargeCardImage.src = link;
    popupLargeCardImage.alt = description;
    popupLargeCardText.textContent = name;

    openModal(popupLargeCard);
}

function handleConfirmPopupDelete(popupFormDelete, cardId, cardElement, popupDelete) {
    popupFormDelete.addEventListener('submit', (evt) => {
        evt.preventDefault();
        deleteCard(cardElement, cardId)

        closeModal(popupDelete)
    })

    openModal(popupDelete);
}

function openPopupAvatarEditForm(popup) {
    openModal(popup)
}

Promise.all([
    getRequest(urlMyProfile, config),
    getRequest(urlCards, config)
]).then(([profileData, cardsData]) => {
    profileTitle.textContent = profileData.name;
    profileDescription.textContent = profileData.about;
    profileAvatar.style.backgroundImage = `url(${profileData.avatar})`;
    
    popupNewPlaceForm.addEventListener(
        'submit', 
        (evt) => {
            handleOpenPopupNewPlace(
            evt, popupNewPlace, popupNewPlaceFormImage, popupNewPlaceFormName, createPopupLargeCard, addCardLike, placesList, profileData, handleConfirmPopupDelete, popupFormDeleteCard, popupDeleteCard 
            )
            buttonSaveNewPlace.textContent = 'Создание...';
    });

    cardsData.forEach((card) => {
        const cardItem = createCard(card.link, card.name, card.likes, createPopupLargeCard, addCardLike, card._id, profileData._id, card.owner, handleConfirmPopupDelete, popupFormDeleteCard, popupDeleteCard)
        addCard(cardItem);
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
    buttonSaveNewAvatar.textContent = 'Сохранить';
    openPopupAvatarEditForm(popupAvatarEdit);
})

popupFormAvatarEdit.addEventListener(
    'submit', 
    (evt) => {
        handleUpdateAvatar(
        evt, popupAvatarEdit, urlMyAvatar, config, popupFormAvatarEditLink.value, profileAvatar
        )
        buttonSaveNewAvatar.textContent = 'Сохранение...';
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
        )
        buttonSavePopupProfile.textContent = 'Сохранение...'
    }
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
        buttonSaveNewPlace.textContent = 'Создать';
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




