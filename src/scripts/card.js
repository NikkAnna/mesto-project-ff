import {
    config,
    deletePlaceRequest,
} from './api.js';

const cardTemplate = document.querySelector('#card-template').content;

function deletePlaceCard(card, cardId) {
    deletePlaceRequest(`${config.baseUrl}/cards/${cardId}`, config)
        .then((data) => card.remove())
        .catch((err) => {
            console.log(err);
        });
}

function createPlaceCard(link, name, likes, createPopupLargeCard, handlePlaceCardLike, cardId, profileId, cardOwnerProfile, handleConfirmPopupDelete, popupFormDelete, popupDelete, description = 'красивая фотография') {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = link;
    cardImage.alt = description;

    cardElement.querySelector('.card__title').textContent = name;

    cardImage.addEventListener('click', () => createPopupLargeCard(link, name, description));

    const likesAmount = likes.length;
    const likeCounter = cardElement.querySelector('.card__like-counter');

    likeCounter.textContent = likesAmount;

    const likebutton = cardElement.querySelector('.card__like-button');
    likebutton.addEventListener('click', (evt) => {
        handlePlaceCardLike(evt, cardId, likeCounter)
    });

    const myLikeIsOnCard = likes.some((like) => {
        return like._id === profileId
    })

    if (myLikeIsOnCard) {
        likebutton.classList.add('card__like-button_is-active');
    } else {
        likebutton.classList.remove('card__like-button_is-active');
    }

    const deleteButton = cardElement.querySelector('.card__delete-button');

    if (cardOwnerProfile._id === profileId) {
        deleteButton.addEventListener('click', () => handleConfirmPopupDelete(popupFormDelete, cardId, cardElement, popupDelete));
    } else {
        deleteButton.style.display = 'none';
    }

    return cardElement;
}

export {
    createPlaceCard,
    deletePlaceCard,
    cardTemplate
}

