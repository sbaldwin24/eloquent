// Every Method
function every(array, test) {
    for (var i = 0; i < array.length; i++) {
        if (!test(array[i])) {
            return false;
        }
    }
    return true;
};

console.log(every([NaN, NaN, NaN, NaN], isNaN)); // true
console.log(every([NaN, NaN, 24, NaN, NaN,], isNaN)); // false



// Some Method
function some(array, test) {
    for (var i = 0; i < array.length; i++) {
        if (test(array[i])) {
            return true;
        }
    }
    return false;
};

console.log(some([NaN, NaN, 5, 24], isNaN)); // true
console.log(some([24, 3, 48, 88], isNaN)); // false
