(function () {


    var addThumbnailClickHandler = function (picture) {
        pictureElement.addEventListener('click', function () {
            bigPicture.classList.remove('hidden');
            pictureCancel.addEventListener('click', closePopup);
            document.addEventListener('keydown', onPopupEscPress);
            bigPicture.querySelector('.big-picture__img').querySelector('img').src = picture.url;
            bigPicture.querySelector('.likes-count').textContent = picture.likes;
            bigPicture.querySelector('.social__caption').textContent = picture.description;
            picture.comments.forEach(function (comment) {
                var commentTemplate = document.querySelector('#comment').content.cloneNode(true);
                const avatarNode = commentTemplate.querySelector('.social__picture');
                avatarNode.src = comment.avatar;
                avatarNode.alt = comment.name;
                commentTemplate.querySelector('.social__text').textContent = comment.message;
                bigPicture.querySelector('.social__comments').appendChild(commentTemplate);
            });
            ['.social__comment-count', '.comments-loader'].forEach(function (selector) {
                bigPicture.querySelector(selector).classList.add('hidden');
            });
            document.body.classList.add('modal-open');

        })
    }

    for (var i = 0; i < allPhotosList.length; i++) {
        var pictureTemplate = document.querySelector('#picture').content.cloneNode(true)
        var pictureElement = pictureTemplate.querySelector('.picture');
        // нашли в шаблоне то ссылку на изображение, которое будем копировать
        pictureElement.querySelector('.picture__img').src = allPhotosList[i].url;
        pictureElement.querySelector('.picture__likes').textContent = allPhotosList[i].likes;
        pictureElement.querySelector('.picture__comments').textContent = allPhotosList[i].comments.length;
        photoContainer.appendChild(pictureElement);
        addThumbnailClickHandler(allPhotosList[i]);

    }
})();