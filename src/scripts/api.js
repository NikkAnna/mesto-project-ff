export const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-12',
    headers: {
        authorization: '8f4967ce-f48f-4d37-a0f6-afbb9d7f6d1e',
        'Content-Type': 'application/json'
    }
}

const handleResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
}

export const deletePlaceRequest = (placeCardId) => {
    return fetch(`${config.baseUrl}/cards/${placeCardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
        .then(handleResponse)
}

export const addPlaceLikeRequest = (placeCardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${placeCardId}`, {
        method: 'PUT',
        headers: config.headers,
    })
        .then(handleResponse)
}

export const removePlaceLikeRequest = (placeCardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${placeCardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
        .then(handleResponse)
}

export const updateProfileRequest = (profile) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(profile),
    })
        .then(handleResponse)
}

export const updateAvatarRequest = (avatarLink) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({ avatar: avatarLink }),
    })
        .then(handleResponse)
}

export const createPlaceRequest = (place) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(place),
    })
        .then(handleResponse)
}

export const getProfileRequest = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers,
    })
        .then(handleResponse)
}

export const getPlacesRequest = () => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers,
    })
        .then(handleResponse)
}