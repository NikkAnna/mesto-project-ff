
function showInputError(form, inputField, inputErrorClass, errorClass) {
    const formError = form.querySelector(`.${inputField.id}-error`);

    inputField.classList.add(inputErrorClass);
    formError.textContent = inputField.validationMessage;
    formError.classList.add(errorClass);
}

function removeInputError(form, inputField, inputErrorClass, errorClass) {
    const formError = form.querySelector(`.${inputField.id}-error`);

    inputField.classList.remove(inputErrorClass);
    formError.classList.remove(errorClass);

    formError.textContent = '';
}

function validateInputField(form, inputField, inputErrorClass, errorClass) {
    if (inputField.validity.patternMismatch) {
        inputField.setCustomValidity(inputField.dataset.errorMessage);
    } else {
        inputField.setCustomValidity('');
    }

    if (!inputField.validity.valid) {
        showInputError(form, inputField, inputErrorClass, errorClass);
    } else {
        removeInputError(form, inputField, inputErrorClass, errorClass);
    }
}

function setEventListeners(form, validationConfig) {
    const inputFields = Array.from(form.querySelectorAll(validationConfig.inputSelector));
    const inputErrorClass = validationConfig.inputErrorClass;
    const errorClass = validationConfig.errorClass;
    const formButton = form.querySelector(validationConfig.submitButtonSelector);
    const inactiveFormButton = validationConfig.inactiveButtonClass;

    toggleFormButtonStatus(inputFields, formButton, inactiveFormButton);

    inputFields.forEach((inputField) => {
        inputField.addEventListener('input', () => {
            validateInputField(form, inputField, inputErrorClass, errorClass);
            toggleFormButtonStatus(inputFields, formButton, inactiveFormButton)
        })
    })
}

export function enableValidation(validationConfig) {
    const forms = Array.from(document.querySelectorAll(validationConfig.formSelector))

    forms.forEach((form) => {
        setEventListeners(form, validationConfig);
    })

}

function checkInvalidInput(inputFields) {
    return inputFields.some((inputField) => {
        return !inputField.validity.valid;
    })
}

function toggleFormButtonStatus(inputFields, formButton, inactiveButtonClass) {
    if (checkInvalidInput(inputFields)) {
        formButton.disabled = true;
        formButton.classList.add(inactiveButtonClass)
    } else {
        formButton.disabled = false;
        formButton.classList.remove(inactiveButtonClass)
    }
}

export function clearValidation(form, validationConfig) {
    const inputFields = Array.from(form.querySelectorAll(validationConfig.inputSelector));
    const inputErrorClass = validationConfig.inputErrorClass;
    const errorClass = validationConfig.errorClass;
    const formButton = form.querySelector(validationConfig.submitButtonSelector);

    inputFields.forEach((inputField) => {
        removeInputError(form, inputField, inputErrorClass, errorClass)
    })

    formButton.disabled = true;
    formButton.classList.add(validationConfig.inactiveButtonClass);
}