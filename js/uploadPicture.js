
let = uplloadPictures = (function () {
    const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
    let fileChooser = document.querySelector('#upload-file');
    let effectsPreviewNodes = document.querySelectorAll('.effects__preview');
    let preview = document.querySelector('.img-upload__image');
    console.log(preview)
    fileChooser.addEventListener('change', function () {
        let file = fileChooser.files[0];
        let fileName = file.name.toLowerCase();
        let matches = FILE_TYPES.some(function (it) {
            return fileName.endsWith(it)
        })
        if (matches) {
            let reader = new FileReader();
            reader.addEventListener('load', function () {
                imageSource = reader.result;
                preview.src = imageSource
                utils.toArray(effectsPreviewNodes).forEach(function (img) {
                    img.style.backgroundImage = 'url(' + imageSource + ')';
                })
            })
            reader.readAsDataURL(file)
        }
    })
})();