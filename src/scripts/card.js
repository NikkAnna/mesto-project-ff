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

export function createPlaceCard(place, selfProfileId, createPopupLargeCard, handlePlaceCardLike, handleOpenPopupDelete, popupDelete) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = place.link;

    cardElement.querySelector('.card__title').textContent = place.name;
    cardImage.alt = cardElement.querySelector('.card__title').textContent;

    cardImage.addEventListener('click', () => createPopupLargeCard(place.link, place.name));

    const likesAmount = place.likes.length;
    const likeCounter = cardElement.querySelector('.card__like-counter');

    likeCounter.textContent = likesAmount;

    const likebutton = cardElement.querySelector('.card__like-button');
    likebutton.addEventListener('click', (evt) => {
        handlePlaceCardLike(evt, place._id, likeCounter)
    });

    const myLikeIsOnCard = place.likes.some((like) => {
        return like._id === selfProfileId
    })

    if (myLikeIsOnCard) {
        likebutton.classList.add('card__like-button_is-active');
    } else {
        likebutton.classList.remove('card__like-button_is-active');
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

export function addPlaceCardLike(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}

export function countPlaceCardLikes(likeCounter, data) {
    likeCounter.textContent = data.likes.length
}
