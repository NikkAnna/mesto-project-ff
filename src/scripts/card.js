import {
    config,
    putRequest,
    deleteRequest
} from './api.js';

const cardTemplate = document.querySelector('#card-template').content;

function deleteCard(card, cardId) {
    card.remove();
    deleteRequest(`${config.baseUrl}/cards/${cardId}`, config)
    .catch((err) => {
        console.log(err); 
    }); 
}

function createCard(link, name, likes, createPopupLargeCard, addCardLike, cardId, profileId, cardOwnerProfile, handleConfirmPopupDelete, popupFormDelete, popupDelete, description = 'красивая фотография') {
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
        addCardLike(evt, cardId, likeCounter)
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

function addCardLike(evt, cardId, likeCounter) {

    evt.target.classList.toggle('card__like-button_is-active');

    if (evt.target.classList.contains('card__like-button_is-active')) {
        putRequest(`${config.baseUrl}/cards/likes/${cardId}`, config)
            .then((data) => {
                likeCounter.textContent = data.likes.length
            }).catch((err) => {
                console.log(err); 
            }); 
    } else {
        deleteRequest(`${config.baseUrl}/cards/likes/${cardId}`, config)
            .then((data) => {
                likeCounter.textContent = data.likes.length
            }).catch((err) => {
                console.log(err); 
            }); 
    }
}

export { 
    createCard, 
    deleteCard, 
    addCardLike, 
    cardTemplate
}

