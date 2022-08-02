'use strict'
let form = (function () {
    let uploadFile = document.querySelector('#upload-file');
    let formUpload = document.querySelector('.img-upload__overlay');
    let imgUploadCancel = document.querySelector('.img-upload__cancel');
    let classNameHastagElement = hashTagInputElement.className;
    let textDescriptionClassName = document.querySelector('.text__description').className;;


    let handlerEscapePressForm = function (evt) {
        utils.escape(evt, closeForm, classNameHastagElement, textDescriptionClassName);
    }

    let openForm = function () {
        imgUploadEffectLevel.classList.add('hidden')
        formUpload.classList.remove('hidden');
        document.addEventListener('keydown', handlerEscapePressForm);
        document.body.classList.add('modal-open');
    }
    let closeForm = function () {
        formUpload.classList.add('hidden');
        document.removeEventListener('keydown', handlerEscapePressForm);
        document.body.classList.remove('modal-open');
        uploadFile.value = null;
        currentScaleValue = 1;
        imgUploadPreview.style.transform = 'scale(1)'

    }
    let onFileChange = function () {
        openForm();
        imgUploadCancel.addEventListener('click', closeForm);
    }

    uploadFile.addEventListener('change', onFileChange)
})();
