'use strict';
var messageUsers = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!', 'Как же круто тут кормят #food #foodgram #instafood', 'Господи, это такая милота, я сейчас умру от нежности, у меня закшалил мимимиметр', '#fun #party #cool #young', 'Затусили с друзьями на море #laptevsea #north #northeastpassage', 'Вот это тачка! #wow #car #carwow #drive', 'Норм', 'Хорошо, когда в жизни есть #друзья, которые вместе со мной могут зайти в #барнарубинштейна и бахнуть', 'Если чётко сформулировать желание для Вселенной, то всё обязательно сбудется. Верьте в себя. Главное хотеть и мечтать..... / Ive bought some potatoes.']
var nameUsers = ["Вася", "Дима", "Ира", "Настя", "Иван", "Никита", "Петр", "Андрей", "Ольга", "Кекс"]
var commentsUser = ['Will you still love me when Im no longer young and beautiful? (c) Ленин', 'Летний чил на югах.', 'Отдыхаем... #chill #relax #group #photo', 'Как же круто тут кормят #food #foodgram #instafood #delicious #yummy', 'Господи, это такая милота, я сейчас умру от нежности, у меня закшалил мимимиметр', 'Затусили с друзьями на море #laptevsea #north #northeastpassage', 'Если чётко сформулировать желание для Вселенной, то всё обязательно сбудется. Верьте в себя. Главное хотеть и мечтать..... / Ive bought some potatoes.', 'Хорошо, когда в жизни есть #друзья, которые вместе со мной могут зайти в #барнарубинштейна и бахнуть #пивка']
var photoContainer = document.querySelector('.pictures'); // блок куда вставляем фото

var bigPicture = document.querySelector('.big-picture');

var bigPictureImage = bigPicture.querySelector('.big-picture__img');

// 
var randomInteger = function (min, max) {
    // случайное число от min до (max+1)
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

var makeComment = function () {
    return {
        avatar: "img/" + "avatar-" + randomInteger(1, 6) + ".svg",
        message: messageUsers[randomInteger(0, messageUsers.length - 1)],
        name: nameUsers[randomInteger(0, nameUsers.length - 1)]
    };
}

var makeComments = function () {
    var commentObj = [];
    for (var i = 0; i < randomInteger(0, 100); i++) {
        commentObj.push(makeComment())
    }
    return commentObj;
}

var allPhotos = function () {
    var photoStatistic = [];
    for (var i = 0; i < 25; i++) {
        photoStatistic.push({
            url: "photos/" + (i + 1) + ".jpg",
            description: commentsUser[randomInteger(0, commentsUser.length - 1)],
            likes: randomInteger(0, 200),
            comments: makeComments()
        });
    }
    return photoStatistic;
}


var allPhotosList = allPhotos();


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
    var like = pictureElement.querySelector('.picture__likes').textContent = allPhotosList[i].likes;
    pictureElement.querySelector('.picture__comments').textContent = allPhotosList[i].comments.length;
    photoContainer.appendChild(pictureElement);
    addThumbnailClickHandler(allPhotosList[i]);

}
var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

var EFFECTS = {
    ORIGINAL: 'none',
    CHROME: 'chrome',
    SEPIA: 'sepia',
    MARVIN: 'marvin',
    PHOBOS: 'phobos',
    HEAT: 'heat',
};

var EFFECTS_CLASSES = {};
EFFECTS_CLASSES[EFFECTS.CHROME] = 'effects__preview--chrome';
EFFECTS_CLASSES[EFFECTS.SEPIA] = 'effects__preview--sepia';
EFFECTS_CLASSES[EFFECTS.MARVIN] = 'effects__preview--marvin';
EFFECTS_CLASSES[EFFECTS.PHOBOS] = 'effects__preview--phobos';
EFFECTS_CLASSES[EFFECTS.HEAT] = 'effects__preview--heat';
EFFECTS_CLASSES[EFFECTS.ORIGINAL] = '';

var EFFECTS_FILTERS_FUNCTIONS = {};
EFFECTS_FILTERS_FUNCTIONS[EFFECTS.ORIGINAL] = function () { return null };
EFFECTS_FILTERS_FUNCTIONS[EFFECTS.SEPIA] = function (filterValue) {
    return 'sepia(' + (filterValue / 100) + ')';
}
EFFECTS_FILTERS_FUNCTIONS[EFFECTS.MARVIN] = function (filterValue) {
    return 'invert(' + (filterValue / 100) + '%' + ')';
}

EFFECTS_FILTERS_FUNCTIONS[EFFECTS.PHOBOS] = function (filterValue) {
    var maxValue = 3;
    return 'blur(' + (maxValue * filterValue / 100) + 'px' + ')';
}

EFFECTS_FILTERS_FUNCTIONS[EFFECTS.HEAT] = function (filterValue) {
    var maxValue = 3;
    return 'brightness(' + (maxValue * filterValue / 100) + ')';
}

EFFECTS_FILTERS_FUNCTIONS[EFFECTS.CHROME] = function (filterValue) {
    return 'grayscale(' + (filterValue / 100) + ')';
}

var uploadFileNode = document.querySelector('#upload-file');
var imgUploadNode = document.querySelector('.img-upload__overlay');
var closeFormUploadNode = document.querySelector('#upload-cancel');
var imgUploadPreviewNode = document.querySelector('.img-upload__preview');
var filterValueNode = document.querySelector('.effect-level__value');
var effectLevelNode = document.querySelector('.img-upload__effect-level');
var currentValueNode = document.querySelector('.scale__control--value');
var imgUploadPreview = document.querySelector('.img-upload__preview');
var effectLineNode = document.querySelector('.effect-level__line');
var effectLevelPinNode = document.querySelector('.effect-level__pin');
var effectLevelDepthNode = document.querySelector('.effect-level__depth');
var pictureCancel = document.querySelector('.big-picture__cancel');
var bigPicturePreview = document.querySelector('big-picture__preview');

var openPopup = function () {
    imgUploadNode.classList.remove('hidden');
    document.body.classList.add('modal-open');
};

var closePopup = function () {
    bigPicture.classList.add('hidden');
    imgUploadNode.classList.add('hidden');
    document.body.classList.remove('modal-open')
    document.removeEventListener('keydown', onPopupEscPress);
    closeFormUploadNode.removeEventListener('click', closePopup);
    // uploadFileNode.value = null;
}

var onPopupEscPress = function (evt) {
    if (evt.key === ESC_KEY) {
        closePopup()
    }
};

var onFileChange = function () {
    openPopup();
    closeFormUploadNode.addEventListener('click', closePopup);
    document.addEventListener('keydown', onPopupEscPress);

    var initialScaleValue = 1;
    var currentScaleValue = initialScaleValue;
    var currentEffect = EFFECTS.ORIGINAL;
    var filterValue = 100;

    // выставляем начальное состояние
    effectLevelNode.classList.add('hidden');
    Object.values(EFFECTS_CLASSES).forEach(function (className) {
        if (className) {
            imgUploadPreview.classList.remove(className);
        }
    });

    effectLevelPinNode.style.left = filterValue + '%';
    effectLevelDepthNode.style.width = filterValue + '%';
    imgUploadPreview.style.transform = 'scale(1)';;


    effectLineNode.addEventListener('click', function (e) {
        const lineRect = effectLineNode.getBoundingClientRect();
        const lineWidth = lineRect.right - lineRect.left;
        filterValue = (e.clientX - lineRect.left) / lineWidth * 100;
        console.log('e.clientX', e.clientX);
        console.log('lineRect.left', lineRect.left);
        imgUploadPreview.style.filter = EFFECTS_FILTERS_FUNCTIONS[currentEffect](filterValue);
        effectLevelPinNode.style.left = filterValue + '%';
        effectLevelDepthNode.style.width = filterValue + '%';
    });

    // "навешиваем" события
    document.querySelector('.scale__control--smaller').addEventListener('click', function () {
        currentScaleValue = Math.max(0, currentScaleValue - 0.25);
        currentValueNode.value = currentScaleValue * 100 + '%';
        imgUploadPreview.style.transform = 'scale(' + currentScaleValue + ')';
    });

    // не забыть отписаться от событий, при закрытии
    document.querySelector('.scale__control--bigger').addEventListener('click', function () {
        currentScaleValue = Math.min(currentScaleValue + 0.25, 1);
        currentValueNode.value = currentScaleValue * 100 + '%';
        imgUploadPreview.style.transform = 'scale(' + currentScaleValue + ')';
    });

    Array.prototype.slice.apply(document.querySelectorAll('.effects__radio')).forEach(function (radioButton) {
        radioButton.addEventListener('change', function (e) {
            var effectName = e.target.value
            //
            Object.values(EFFECTS_CLASSES).forEach(function (className) {
                if (className) {
                    imgUploadPreview.classList.remove(className);
                }
            });
            const effectClassName = EFFECTS_CLASSES[effectName];
            if (effectClassName) {
                imgUploadPreviewNode.classList.add(effectClassName);
            }
            //
            if (effectName === EFFECTS.ORIGINAL) {
                effectLevelNode.classList.add('hidden');
            } else {
                if (currentEffect == EFFECTS.ORIGINAL) {
                    effectLevelNode.classList.remove('hidden');
                }
            }
            imgUploadPreview.style.filter = EFFECTS_FILTERS_FUNCTIONS[effectName](100);
            currentEffect = effectName;
            effectLevelPinNode.style.left = 100 + '%';
            effectLevelDepthNode.style.width = 100 + '%';
        })
    });
}

uploadFileNode.addEventListener('change', onFileChange);

var hashTagInputElement = document.querySelector('.text__hashtags');
// var space = ' ';
hashTagInputElement.addEventListener('input', function (event) {
    event.preventDefault();
    var hashTagsString = event.target.value;
    var hashTagsArray = hashTagsString.split(' ');
    if (hashTagsArray.length <= 5) {
        // посмотреть метод
        hashTagsArray.some((hashTag) => {

            if (!hashTag.startsWith('#')) {
                hashTagInputElement.setCustomValidity('Хэш-тег должен начинаться с символа');
                return true;
            }
            else {
                if (hashTag === '#') {
                    hashTagInputElement.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
                    return true;
                } else {
                    if (hashTag.length > 20) {
                        hashTagInputElement.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку');
                        return true;

                    }

                    else {
                        hashTagInputElement.setCustomValidity('');
                    }
                    for (var i = 0; i < hashTagsArray.length; i++) {
                        var currentHashtag = hashTagsArray[i].toLowerCase();
                        for (var j = i + 1; j < hashTagsArray.length; j++) {
                            var nextHashtag = hashTagsArray[j].toLowerCase();
                            if (nextHashtag === currentHashtag) {
                                hashTagInputElement.setCustomValidity('один и тот же хэш-тег не может быть использован дважды;');
                            }
                        }
                    }
                }

            }
        });
    } else {
        hashTagInputElement.setCustomValidity('Нельзя указать больше пяти хэш-тегов')
    }
})








