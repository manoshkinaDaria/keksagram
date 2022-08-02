'use strict'
let dialog = (function () {
    let bigPicture = document.querySelector('.big-picture');
    let socialCommentCount = document.querySelector('.social__comment-count');
    let commentsLoader = document.querySelector('.comments-loader');
    let textHashtags = document.querySelector('.text__hashtags');
    let textDescription = document.querySelector('.text__description')

    let uploadFile = document.querySelector('#upload-file');
    let imgUploadOverlay = document.querySelector('.img-upload__overlay');
    let imgUploadPreview = document.querySelector('.img-upload__preview');
    let socialCommentsLoader = document.querySelector('.social__comments-loader');


    let openPopup = function () {
        imgUploadOverlay.classList.remove('hidden');
        document.querySelector('body').classList.add('modal-open');
        document.addEventListener('keydown', handlerEscape);
    }
    
    let closePopup = function () {
        imgUploadOverlay.classList.add('hidden');
        bigPicture.classList.add('hidden');
        document.removeEventListener('keydown', handlerEscape);
        uploadFile.value = null;
        imgUploadPreview.style.transform = 'scale(1)';
        document.body.classList.remove('modal-open');
    }

    let handlerEscape = function (evt) {
        utils.escape(evt, closePopup, textHashtags, textDescription)
    }

    return {
        openPopup: openPopup,
        closePopup: closePopup,
        handlerEscape: handlerEscape
    }

})();