'use strict';
let picture = (function () {

    let documentFragment = document.createDocumentFragment();
    let picturesContainer = document.querySelector('.pictures');
    let bigPicture = document.querySelector('.big-picture');


    let createPicture = function (picture) {
        let pictureTemplate = document.querySelector('#picture').content.cloneNode(true);
        let pictureElement = pictureTemplate.querySelector('.picture');
        pictureElement.querySelector('.picture__img').src = picture.url;
        pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
        pictureElement.querySelector('.picture__likes').textContent = picture.likes;
        return pictureElement
    }

    utils.toArray(data.cardsCollection).forEach(function (card) {
        let documentFragment = document.createDocumentFragment();
        documentFragment.appendChild(createPicture(card));
        picturesContainer.appendChild(documentFragment)

    });


    return {
        bigPicture: bigPicture,
        picturesContainer: picturesContainer,
        createPicture: createPicture
    }

})();