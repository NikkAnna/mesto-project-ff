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
}

export const getRequest = (url, config) => {
    return fetch(url, {
        method: 'GET',
        headers: config.headers,
    })
    .then(handleResponse)
}

export const putRequest = (url, config) => {
    return fetch(url, {
        method: 'PUT',
        headers: config.headers,
    })
    .then(handleResponse)
}

export const deleteRequest = (url, config) => {
    return fetch(url, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then(handleResponse)
}

export const postRequest = (url, config, data) => {
    return fetch(url, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(data),
    })
    .then(handleResponse)
}

export const patchRequest = (url, config, data) => {
    return fetch(url, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(data),
    })
    .then(handleResponse)
}
