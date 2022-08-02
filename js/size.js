let editor = (function () {
    let scaleControlBigger = document.querySelector('.scale__control--bigger');
    let scaleControlSmaller = document.querySelector('.scale__control--smaller');
    let scaleControlValue = document.querySelector('.scale__control--value');
    let imgUploadPreview = document.querySelector('.img-upload__preview');
    let initialValue = 1;
    let currentValue = initialValue;
    
// доделать закрытие
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

    return {
        scaleControlValue: scaleControlValue,
        imgUploadPreview: imgUploadPreview,
        currentValue: currentValue
    }

})();