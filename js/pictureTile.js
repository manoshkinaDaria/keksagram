'use strict'
let pictureTile = (function () {
    let imgFilters = document.querySelector('.img-filters');
    imgFilters.classList.remove('img-filters--inactive');
    let filterRandom = document.querySelector('#filter-random');
    let filterDiscussed = document.querySelector('#filter-discussed');
    let filterDefault = document.querySelector('#filter-default');
    let buttonsContainer = Array.prototype.slice.call(document.querySelectorAll('.img-filters__button'))


    let drawPictures = function (pictures) {
        utils.toArray(picture.picturesContainer.querySelectorAll('.picture')).forEach(function (picture) {
            picture.remove();
        });
        pictures.forEach(function (pic) {
            picture.picturesContainer.appendChild(picture.createPicture(pic))
        });
    };

    let drawDiscussedPictures = function () {
        let discussedPictures = data.cardsCollection.slice();
        discussedPictures.sort(function (a, b) {
            return b.comments.length - a.comments.length;
        });
        drawPictures(discussedPictures);
    }


    let drawRandomPictures = function () {
        let newArrayForRandom = data.cardsCollection.slice();
        drawPictures(utils.shuffle(newArrayForRandom).slice(1, 10))
    }
    filterRandom.addEventListener('click', drawRandomPictures);
    filterDiscussed.addEventListener('click', drawDiscussedPictures);

    let drawDefaultPictures = function () {
        drawPictures(data.cardsCollection)
    }
    filterDefault.addEventListener('click', drawDefaultPictures)

    let changeActive = function () {
        buttonsContainer.forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                let target = e.target;
                if (!target.classList.contains('img-filters__button--active')) {
                    buttonsContainer.forEach(function (button) {
                        if (button.classList.contains('img-filters__button--active')) {
                            button.classList.remove('img-filters__button--active')
                        }
                    })
                    target.classList.add('img-filters__button--active');
                    drawCurrentPictures()
                }
            })
        })
    }
    changeActive()

    let drawCurrentPictures = function () {
        const activeButton = document.querySelector('.img-filters__button--active');
        switch (activeButton.getAttribute('id')) {
            case 'filter-random':
                drawRandomPictures();
                break;
            case 'filter-discussed':
                drawDiscussedPictures()
                break
            default:
                drawDefaultPictures()
        }
    }

})();