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

export const deletePlaceRequest = (url, config) => {
    return fetch(url, {
        method: 'DELETE',
        headers: config.headers,
    })
        .then(handleResponse)
}

export const addPlaceLikeRequest = (url, config) => {
    return fetch(url, {
        method: 'PUT',
        headers: config.headers,
    })
        .then(handleResponse)
}

export const removePlaceLikeRequest = (url, config) => {
    return fetch(url, {
        method: 'DELETE',
        headers: config.headers,
    })
        .then(handleResponse)
}

export const updateProfileRequest = (url, config, profile) => {
    return fetch(url, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(profile),
    })
        .then(handleResponse)
        .catch((err) => {
            console.log(err);
        });
}

export const updateAvatarRequest = (url, config, avatarLink) => {
    return fetch(url, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({ avatar: avatarLink }),
    })
        .then(handleResponse)
}

export const createPlaceRequest = (url, config, place) => {
    return fetch(url, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(place),
    })
        .then(handleResponse)
}

export const getProfileRequest = (url, config) => {
    return fetch(url, {
        method: 'GET',
        headers: config.headers,
    })
        .then(handleResponse)
}

export const getPlacesRequest = (url, config) => {
    return fetch(url, {
        method: 'GET',
        headers: config.headers,
    })
        .then(handleResponse)
}