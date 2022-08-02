'use strict'
let setup = (function () {
    let fragment = document.createDocumentFragment();
    let allPictures = document.querySelector('.pictures');
    let imgFilters = document.querySelector('.img-filters');
    let filterRandom = document.querySelector('#filter-random');
    let filterDefault = document.querySelector('#filter-default');
    let filterDiscussed = document.querySelector('#filter-discussed');
    let imgFiltersForm = document.querySelector('.img-filters__form');
    imgFilters.classList.remove('img-filters--inactive');


    let removePictures = function () {
        utils.toArray(document.querySelectorAll('.picture')).forEach(function (picture) {
            picture.remove();
        })
    };

    let createFilterDefault = function () {
        removePictures();
        utils.toArray(data.cardsCollection).forEach(function (card) {
            fragment.appendChild(data.renderPicture(card))
        })
        allPictures.appendChild(fragment)
    }
    

    createFilterDefault();
    filterDefault.addEventListener('click', createFilterDefault)

    filterRandom.addEventListener('click', function () {
        removePictures()
        let uniquePictureArray = utils.getRandom(1, 25)
        let cardsCollectionRandom = data.createCard(10, uniquePictureArray);
        utils.toArray(cardsCollectionRandom).forEach(function (card) {
            fragment.appendChild(data.renderPicture(card))
        })
        allPictures.appendChild(fragment)
    });

    let discussedArray = data.cardsCollection.slice().sort(function (a, b) {
        return b.comments.length - a.comments.length;
    });

    filterDiscussed.addEventListener('click', function () {
        removePictures();
        utils.toArray(discussedArray).forEach(function (card) {
            fragment.appendChild(data.renderPicture(card))
        })
        allPictures.appendChild(fragment)
    })

    imgFiltersForm.addEventListener('click', function (evt) {
        let closestButton = evt.target;
        if (closestButton.contains(filterRandom)) {
            filterRandom.classList.add('img-filters__button--active')
            filterDefault.classList.remove('img-filters__button--active');
            filterDiscussed.classList.remove('img-filters__button--active');
        } else if (closestButton.contains(filterDefault)) {
            filterDefault.classList.add('img-filters__button--active');
            filterRandom.classList.remove('img-filters__button--active');
            filterDiscussed.classList.remove('img-filters__button--active');
        } else if (closestButton.contains(filterDiscussed)) {
            filterDiscussed.classList.add('img-filters__button--active');
            filterRandom.classList.remove('img-filters__button--active');
            filterDefault.classList.remove('img-filters__button--active');
        }

    })

    
})();