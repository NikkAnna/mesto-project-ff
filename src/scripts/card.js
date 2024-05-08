import {
    deletePlaceRequest,
} from './api.js';

const cardTemplate = document.querySelector('#card-template').content;

export function deletePlaceCard(card, cardId) {
    deletePlaceRequest(cardId)
        .then((data) => card.remove())
        .catch((err) => {
            console.log(err);
        });
}

export function createPlaceCard(place, selfProfileId, createPopupLargeCard, handleTogglePlaceCardLike, handleOpenPopupDelete, popupDelete) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = place.link;

    cardElement.querySelector('.card__title').textContent = place.name;
    cardImage.alt = place.name;

    cardImage.addEventListener('click', () => createPopupLargeCard(place.link, place.name));

    const likesAmount = place.likes.length;
    const likeCounter = cardElement.querySelector('.card__like-counter');

    likeCounter.textContent = likesAmount;

    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', (evt) => {
        handleTogglePlaceCardLike(evt, place._id, likeCounter)
    });

    const myLikeIsOnCard = place.likes.some((like) => {
        return like._id === selfProfileId
    })

    if (myLikeIsOnCard) {
        addPlaceCardLike(likeButton);
    } else {
        removePlaceCardLike(likeButton);
    };

    const deleteButton = cardElement.querySelector('.card__delete-button');

    if (place.owner._id === selfProfileId) {
        deleteButton.addEventListener('click', () => {
            handleOpenPopupDelete(place._id, cardElement, popupDelete);
        });
        deleteButton.classList.remove('card__delete-button_inactive');
    } else {
        deleteButton.classList.add('card__delete-button_inactive');
    };

    return cardElement;
}

export function addPlaceCardLike(likeButton) {
    likeButton.classList.add('card__like-button_is-active');
}

export function removePlaceCardLike(likeButton) {
    likeButton.classList.remove('card__like-button_is-active');
}

export function countPlaceCardLikes(likeCounter, data) {
    likeCounter.textContent = data.likes.length
}

export function cardPlaceLikeStatus(likeButton) {
    if (likeButton.classList.contains('card__like-button_is-active')) {
        return true;
    } else {
        return false;
    }
}
