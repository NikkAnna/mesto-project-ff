//функции, связанные с открытием/ закрытием модальных окон

function openModal(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeModalByEscapeButton);
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeModalByEscapeButton);
}

function closeModalByOverlayAndCloseButton(evt, popup) {
    if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
        closeModal(popup);
    }
}

function closeModalByEscapeButton(evt){
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_is-opened');
        closeModal(popup);
    };
}

export { 
    openModal, 
    closeModal,
    closeModalByOverlayAndCloseButton
}