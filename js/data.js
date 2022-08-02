'use strict'
let data = (function () {
    let messageUsers = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!', 'Как же круто тут кормят #food #foodgram #instafood', 'Господи, это такая милота, я сейчас умру от нежности, у меня закшалил мимимиметр', '#fun #party #cool #young', 'Затусили с друзьями на море #laptevsea #north #northeastpassage', 'Вот это тачка! #wow #car #carwow #drive', 'Норм', 'Хорошо, когда в жизни есть #друзья, которые вместе со мной могут зайти в #барнарубинштейна и бахнуть', 'Если чётко сформулировать желание для Вселенной, то всё обязательно сбудется. Верьте в себя. Главное хотеть и мечтать..... / Ive bought some potatoes.']
    let nameUsers = ["Вася", "Дима", "Ира", "Настя", "Иван", "Никита", "Петр", "Андрей", "Ольга", "Кекс"]
    let commentsUser = ['Will you still love me when Im no longer young and beautiful? (c) Ленин', 'Летний чил на югах.', 'Отдыхаем... #chill #relax #group #photo', 'Как же круто тут кормят #food #foodgram #instafood #delicious #yummy', 'Господи, это такая милота, я сейчас умру от нежности, у меня закшалил мимимиметр', 'Затусили с друзьями на море #laptevsea #north #northeastpassage', 'Если чётко сформулировать желание для Вселенной, то всё обязательно сбудется. Верьте в себя. Главное хотеть и мечтать..... / Ive bought some potatoes.', 'Хорошо, когда в жизни есть #друзья, которые вместе со мной могут зайти в #барнарубинштейна и бахнуть #пивка']
    let bigPicture = document.querySelector('.big-picture');
    let bigPictureCancel = document.querySelector('#picture-cancel')
    let socialComments = bigPicture.querySelector('.social__comments');
    let socialCommentsLoader = document.querySelector('.social__comments-loader');
    let socialCommentCount = document.querySelector('.social__comment-count');

    let makeComment = function () {
        let commentsArray = [];
        for (let i = 0; i < utils.randomValue(utils.getRandom(4, 20)); i++) {
            let comment = {
                avatar: 'img/avatar-' + utils.randomValue(utils.getRandom(1, 6)) + '.svg',
                message: utils.randomValue(messageUsers),
                name: utils.randomValue(nameUsers)
            }
            commentsArray.push(comment)
        }
        return commentsArray
    }

    let allCardsArray = utils.getRandom(1, 25);
    
    let createCard = function (array) {
        let arrayCards = [];
        for (let i = 0; i < array.length; i++) {
            let photoCard = {
                url: 'photos/' + array[i] + '.jpg',
                description: utils.randomValue(commentsUser),
                likes: utils.randomValue(utils.getRandom(15, 200)),
                comments: makeComment()
            };
            arrayCards.push(photoCard)
        };
        return arrayCards
    };

    let cardsCollection = createCard(allCardsArray);


    console.log(cardsCollection)
    return {
        cardsCollection: cardsCollection,
        createCard: createCard
    }

})();