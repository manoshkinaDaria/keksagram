'use strict'
let utils = (function () {
    let ENTER = 'Enter';
    let ESCAPE = 'Escape';
    return {
        getRandom: function (min, max) {
            let newArray = [];
            for (let i = min; i < min + max; i++) {
                newArray.push(i)
                newArray.sort(() => Math.random() - 0.5)
            }
            return newArray
        },
        randomValue: function (array) {
            return array[Math.floor(array.length * Math.random())];
        },
        toArray: function (arrayLike) {
            return Array.prototype.slice.call(arrayLike);

        },
        escape: function (evt, callback, classNameHasTag, classNametextDescription) {
            if (evt.key === ESCAPE && evt.target.className !== classNameHasTag && evt.target.className !== classNametextDescription) {
                callback();
            }
        },
        shuffle: function shuffle(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }
    }

})()