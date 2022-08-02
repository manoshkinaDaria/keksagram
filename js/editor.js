let editor = (function () {
    let scaleControlBigger = document.querySelector('.scale__control--bigger');
    let scaleControlSmaller = document.querySelector('.scale__control--smaller');
    let scaleControlValue = document.querySelector('.scale__control--value');
    let imgUploadPreview = document.querySelector('.img-upload__preview');
    let imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
    let uploadCancel = document.querySelector('#upload-cancel');
    let uploadFile = document.querySelector('#upload-file');
    let effectLevelPin = document.querySelector('.effect-level__pin');
    let effectLevelDepth = document.querySelector('.effect-level__depth');
    let effectsRadio = document.querySelectorAll('.effects__radio');
    let effectLevelLine = document.querySelector('.effect-level__line');
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
    let filterValue = 100;

    let EFFECTS_FILTERS_FUNCTIONS = {};
    EFFECTS_FILTERS_FUNCTIONS[EFFECTS.ORIGINAL] = function () { return null };
    EFFECTS_FILTERS_FUNCTIONS[EFFECTS.CHROME] = function (filterValue) {
        return 'grayscale(' + (filterValue / 100) + ')'
    };

    EFFECTS_FILTERS_FUNCTIONS[EFFECTS.SEPIA] = function (filterValue) {
        return 'sepia(' + (filterValue / 100) + ')'
    }
    EFFECTS_FILTERS_FUNCTIONS[EFFECTS.MARVIN] = function (filterValue) {
        return 'invert(' + filterValue + '%' + ')';
    }

    EFFECTS_FILTERS_FUNCTIONS[EFFECTS.PHOBOS] = function (filterValue) {
        let max = 3;
        return 'blur(' + (filterValue * max / 100) + 'px)'
    }

    EFFECTS_FILTERS_FUNCTIONS[EFFECTS.HEAT] = function (filterValue) {
        let max = 3;
        return 'brightness(' + (max * filterValue / 100) + ')';

    }

    let onFileChange = function () {
        let initialValue = 1;
        let currentValue = initialValue;
        dialog.openPopup()
        uploadCancel.addEventListener('click', dialog.closePopup)
        document.addEventListener('keydown', dialog.handlerEscape)
        imgUploadEffectLevel.classList.add('hidden');

        Object.values(EFFECTS_CLASSES).forEach(function (className) {
            if (className) {
                imgUploadPreview.classList.remove(className);
            }
        });

        imgUploadPreview.style.transform = 'scale(1)';;

        scaleControlSmaller.addEventListener('click', function () {

            currentValue = Math.max(0.25, currentValue - 0.25);
            imgUploadPreview.style.transform = 'scale' + '(' + currentValue + ')';
            scaleControlValue.value = currentValue * 100 + '%'
            console.log(currentValue)
        })

        scaleControlBigger.addEventListener('click', function () {
            currentValue = Math.min(currentValue + 0.25, 1);
            imgUploadPreview.style.transform = 'scale' + '(' + currentValue + ')';
            scaleControlValue.value = currentValue * 100 + '%'

        })

        let currentEffect = EFFECTS.ORIGINAL

        Array.prototype.slice.apply(effectsRadio).forEach(function (radioButton) {
            radioButton.addEventListener('change', function (e) {
                let effectName = e.target.value;

                Object.values(EFFECTS_CLASSES).forEach(function (className) {
                    if (className) {
                        imgUploadPreview.classList.remove(className)
                    }
                    let effectClassName = EFFECTS_CLASSES[effectName]
                    if (effectClassName) {
                        imgUploadPreview.classList.add(effectClassName)
                    }
                    if (effectName === EFFECTS.ORIGINAL) {
                        imgUploadEffectLevel.classList.add('hidden')
                    } else {
                        if (currentEffect == EFFECTS.ORIGINAL) {
                            imgUploadEffectLevel.classList.remove('hidden')
                        }
                        // я не понел это как


                    }
                    imgUploadPreview.style.filter = EFFECTS_FILTERS_FUNCTIONS[effectName](100)
                    currentEffect = effectName;
                    effectLevelPin.style.left = 100 + '%';
                    effectLevelDepth.style.width = 100 + '%';

                })
            })
        })
        let onMouseMove = function (moveEvt) {
            moveEvt.preventDefault();
            let lineRect = effectLevelLine.getBoundingClientRect();
            let pinCoordX = moveEvt.clientX - lineRect.left;
            if (pinCoordX < 0) {
                pinCoordX = 0
            } else if (pinCoordX > effectLevelLine.offsetWidth) {
                pinCoordX = effectLevelLine.offsetWidth
            }
            filterValue = pinCoordX / effectLevelLine.offsetWidth * 100;
            imgUploadPreview.style.filter = EFFECTS_FILTERS_FUNCTIONS[currentEffect](filterValue)
            effectLevelPin.style.left = filterValue + '%';
            effectLevelDepth.style.width = filterValue + '%';
        }
        effectLevelPin.addEventListener('mousedown', function (evt) {
            evt.preventDefault();
            let onMouseUp = function (upEvt) {
                upEvt.preventDefault();

                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            };
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        })
    }


    uploadFile.addEventListener('change', onFileChange)


})();