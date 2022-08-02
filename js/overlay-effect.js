'use strict';
let overlayEffect = (function () {
    let effectLevelPin = document.querySelector('.effect-level__pin');
    window.imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
    let effectLevelDepth = document.querySelector('.effect-level__depth');
    let effectLevelLine = document.querySelector('.effect-level__line');
    let EFFECTS = {
        ORIGINAL: 'none',
        CHROME: 'chrome',
        SEPIA: 'sepia',
        MARVIN: 'marvin',
        PHOBOS: 'phobos',
        HEAT: 'heat',
    };
    let filterValue = 100;
    let EFFECTS_CLASSES = {}
    EFFECTS_CLASSES[EFFECTS.ORIGINAL] = 'effects__preview--none';
    EFFECTS_CLASSES[EFFECTS.CHROME] = 'effects__preview--chrome';
    EFFECTS_CLASSES[EFFECTS.SEPIA] = 'effects__preview--sepia';
    EFFECTS_CLASSES[EFFECTS.MARVIN] = 'effects__preview--marvin';
    EFFECTS_CLASSES[EFFECTS.PHOBOS] = 'effects__preview--phobos';
    EFFECTS_CLASSES[EFFECTS.HEAT] = 'effects__preview--heat';

    let currentEffect = EFFECTS.ORIGINAL;

    let EFFECTS_FILTERS_FUNCTIONS = {}
    EFFECTS_FILTERS_FUNCTIONS[EFFECTS.ORIGINAL] = function () { return null };
    EFFECTS_FILTERS_FUNCTIONS[EFFECTS.CHROME] = function (filterValue) {
        return 'grayscale(' + (filterValue / 100) + ')'
    }
    EFFECTS_FILTERS_FUNCTIONS[EFFECTS.SEPIA] = function (filterValue) {
        return 'sepia(' + (filterValue / 100) + ')'
    }
    EFFECTS_FILTERS_FUNCTIONS[EFFECTS.MARVIN] = function (filterValue) {
        return 'invert(' + filterValue + '%)'
    }
    EFFECTS_FILTERS_FUNCTIONS[EFFECTS.PHOBOS] = function (filterValue) {
        let max = 3;
        return 'blur(' + filterValue * max / 100 + 'px)'
    }
    EFFECTS_FILTERS_FUNCTIONS[EFFECTS.HEAT] = function (filterValue) {
        let max = 3;
        return 'brightness(' + filterValue * max / 100 + ')'
    }

    Array.prototype.slice.apply(document.querySelectorAll('.effects__radio')).forEach(function (radioButton) {
        radioButton.addEventListener('click', function (e) {
            let effectName = e.target.value;
            Object.values(EFFECTS_CLASSES).forEach(function (className) {
                if (className) {
                    imgUploadPreview.classList.remove(className)
                };
            });
            if (effectName === EFFECTS.ORIGINAL) {
                imgUploadEffectLevel.classList.add('hidden');
            } else (imgUploadEffectLevel.classList.remove('hidden'));
            imgUploadPreview.style.filter = EFFECTS_FILTERS_FUNCTIONS[effectName](100);
            currentEffect = effectName;
            effectLevelPin.style.left = 100 + '%';
            effectLevelDepth.style.width = 100 + '%'

        });
    });


    let onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        let lineRect = effectLevelLine.getBoundingClientRect();
        let pinCoordX = moveEvt.clientX - lineRect.left;
        if (pinCoordX < 0) {
            pinCoordX = 0;
        } else if (pinCoordX > effectLevelLine.offsetWidth) {
            pinCoordX = effectLevelLine.offsetWidth
        }
        filterValue = pinCoordX / effectLevelLine.offsetWidth * 100;
        imgUploadPreview.style.filter = EFFECTS_FILTERS_FUNCTIONS[currentEffect](filterValue);
        effectLevelPin.style.left = filterValue + '%';
        effectLevelDepth.style.width = filterValue + '%';
    }

    effectLevelPin.addEventListener('mousedown', function (evt) {
        evt.preventDefault();
        let onMouseUp = function (upEvt) {
            upEvt.preventDefault();
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp)

    })

    return {
        onMouseMove: onMouseMove
    }

})();