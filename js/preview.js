'use strict'
let preview = (function () {
    let bigPicture = document.querySelector('.big-picture');
    let picturesContainer = document.querySelector('.pictures');
    let bigPictureCancel = document.querySelector('.big-picture__cancel');
    let socialComments = document.querySelector('.social__comments');
    let socialCommentCount = document.querySelector('.social__comment-count');
    let commentsCount = socialCommentCount.querySelector('.comments-count');
    let socialCommentsLoader = document.querySelector('.social__comments-loader');


    let createComment = function (comment) {
        let commentTemplate = document.querySelector('#comment').content.cloneNode(true);
        let commentAvatar = commentTemplate.querySelector('.social__picture');
        commentAvatar.src = comment.avatar;
        commentTemplate.querySelector('.social__text').textContent = comment.message;
        commentAvatar.alt = comment.name;
        return commentTemplate;
    }


    let drawComments = function (card, from, to) {
        socialCommentCount.textContent = to + ' из ' + card.comments.length + ' комментариев';
        card.comments.slice(from, to).forEach(function (comment) {
            let commentFragment = document.createDocumentFragment();
            commentFragment.appendChild(createComment(comment));
            socialComments.appendChild(commentFragment);

        });
    };

    let drawPartOfComments = function (card) {
        let currentComentsAmount = 5;
        socialCommentsLoader.addEventListener('click', function() {
            let diffComments = card.comments.length - currentComentsAmount;
            let prevAmount = currentComentsAmount;
            currentComentsAmount += Math.min(currentComentsAmount, diffComments);
            drawComments(card, prevAmount, currentComentsAmount);
            console.log(currentComentsAmount)
            
        });
    }



    picturesContainer.addEventListener('click', function (evt) {
        let pic = evt.target.closest('.picture')
        if (pic) {
            openPopup();
            let AttributePicture = pic.querySelector('.picture__img').getAttribute('src');
            data.cardsCollection.forEach(function (card) {
                if (card.url === AttributePicture) {
                    bigPicture.querySelector('.big-picture__img').querySelector('img').src = card.url;
                    bigPicture.querySelector('.likes-count').textContent = card.likes;
                    bigPicture.querySelector('.comments-count').textContent = card.comments.length;
                    bigPicture.querySelector('.social__caption').textContent = card.description;
                    
                    drawComments(card, 0, 5)
                    drawPartOfComments(card)
                };

            });

        }
    });


    let handlerEscapePress = function (evt) {
        utils.escape(evt, closePopup)
    };

    let openPopup = function () {
        bigPicture.classList.remove('hidden');
        document.addEventListener('keydown', handlerEscapePress);
        document.body.classList.add('modal-open')

    }



    let closePopup = function () {
        bigPicture.classList.add('hidden');
        document.removeEventListener('keydown', handlerEscapePress);
        document.body.classList.remove('modal-open');
        socialComments.innerHTML = '';
        
        
    }
    bigPictureCancel.addEventListener('click', function () {
        closePopup();
    });

    return {
        openPopup: openPopup,
        closePopup: closePopup
    }


})();