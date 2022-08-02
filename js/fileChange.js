'use strict'
let fileChange = (function () {
    let bigPicture = document.querySelector('.big-picture');
    let socialCommentCount = document.querySelector('.social__comment-count');
    let commentsLoader = document.querySelector('.comments-loader');
    bigPicture.querySelector('.big-picture__img').querySelector('img').src = data.cardsCollection[0].url;
    bigPicture.querySelector('.likes-count').textContent = data.cardsCollection[0].likes;
    bigPicture.querySelector('.comments-count').textContent = data.cardsCollection[0].comments.length;
    bigPicture.querySelector('.social__caption').textContent = data.cardsCollection[0].description;
    socialCommentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');

    let EFFECTS = {
        ORIGINAL: 'none',
        CHROME: 'chrome',
        SEPIA: 'sepia',
        MARVIN: 'marvin',
        PHOBOS: 'phobos',
        HEAT: 'heat',
    };

    let EFFECTS_CLASSES = {};
    EFFECTS_CLASSES[EFFECTS.CHROME] = 'effects__preview--chrome';
    EFFECTS_CLASSES[EFFECTS.SEPIA] = 'effects__preview--sepia';
    EFFECTS_CLASSES[EFFECTS.MARVIN] = 'effects__preview--marvin';
    EFFECTS_CLASSES[EFFECTS.PHOBOS] = 'effects__preview--phobos';
    EFFECTS_CLASSES[EFFECTS.HEAT] = 'effects__preview--heat';
    EFFECTS_CLASSES[EFFECTS.ORIGINAL] = '';
})()