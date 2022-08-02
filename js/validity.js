'use strict'
let validity = (function () {

   window.hashTagInputElement = document.querySelector('.text__hashtags');
    var regExp = /[^a-zа-яё0-9]/gi;

    hashTagInputElement.addEventListener('input', function (event) {
        let hashTag = event.target.value;
        let hashTagsArray = hashTag.split(' ');
        console.log(hashTagsArray)
        if (hashTagsArray.length < 5) {
            hashTagsArray.some((hashTag) => {
                if (hashTag === '#') {
                    hashTagInputElement.setCustomValidity('хеш-тег не может состоять только из одной решётки;');
                    return true;
                } else {
                    if (hashTag.length > 20) {
                        hashTagInputElement.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку');
                        return true;
                    }
                    else {
                        regExp.lastIndex = 1;
                        if (regExp.exec(hashTag)) {
                            hashTagInputElement.setCustomValidity('строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т.п.), символы пунктуации (тире, дефис, запятая и т.п.), эмодзи и т.д.;');
                            return true
                        } else {
                            if (!hashTag.startsWith('#')) {
                                hashTagInputElement.setCustomValidity('хэш-тег начинается с символа # (решётка);');
                                return true;
                            } else {
                                hashTagInputElement.setCustomValidity('');
                                for (let i = 0; i < hashTagsArray.length; i++) {
                                    for (let j = i + 1; j < hashTagsArray.length; j++) {
                                        if (hashTagsArray[i] === hashTagsArray[j].toLowerCase()) {
                                            hashTagInputElement.setCustomValidity('один и тот же хэш-тег не может быть использован дважды');
                                            return true;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            })
        } else {
            hashTagInputElement.setCustomValidity('нельзя указать больше пяти хэш-тегов');
        }
    })
})();