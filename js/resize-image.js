'use strict'
let scaleControlSmaller = document.querySelector('.scale__control--smaller');
let scaleControlBigger = document.querySelector('.scale__control--bigger');
window.imgUploadPreview = document.querySelector('.img-upload__preview');
window.scaleControlValue = document.querySelector('.scale__control--value');
let initialScaleValue = 1;
window.currentScaleValue = initialScaleValue;
let minScaleValue = 0.25;

scaleControlSmaller.addEventListener('click', function () {
    currentScaleValue = Math.max(minScaleValue, currentScaleValue - minScaleValue);
    imgUploadPreview.style.transform = 'scale(' + currentScaleValue + ')';
    scaleControlValue.value = currentScaleValue * 100 + '%';
})
scaleControlBigger.addEventListener('click', function () {
    currentScaleValue = Math.min(initialScaleValue, currentScaleValue + minScaleValue);
    imgUploadPreview.style.transform = 'scale(' + currentScaleValue + ')';
    scaleControlValue.value = currentScaleValue * 100 + '%';
})