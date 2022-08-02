(function () {
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


    window.allPhotosList = allPhotos();
   
})();