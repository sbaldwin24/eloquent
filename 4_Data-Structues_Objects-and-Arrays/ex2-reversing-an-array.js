// Reversing an array

// Arrays have a method reverse, which changes the array by inverting the order in which its elements appear. For this exercise, write two functions,
// reverseArray and reverseArrayInPlace. The first, reverseArray, takes an array as argument and produces a new array that has the same elements in the inverse
// order. The second, reverseArrayInPlace, does what the reverse method does: it modifies the array given as argument in order to reverse its elements. Neither
// may use the standard reverse method.

// Thinking back to the notes about side effects and pure functions in the previous chapter, which variant do you expect to be useful in more situations?
// Which one is more efficient?

// using unshift method
function reverseArray(array) {
    var newArray = [];
    for (var i = 1; i <= array.length; i++) {
        newArray.unshift(i);
    }
    return newArray;
}
reverseArray([1,2,3,4,5,6,7,8,9,10]);
// -> [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
// this will return string values in order
// reverseArray(["A", "B", "C"])
// -> [3, 2, 1]

// using push method
function reverseArray(array) {
    var newArray = [];
    for (var i = array.length - 1; i >= 0; i--) {
        newArray.push(array[i]);
    }
    return newArray;
}
reverseArray([1,2,3,4,5,6,7,8,9,10]);
// -> [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
// this will return an array with string values
// reverseArray(["A", "B", "C"])
// -> ["C", "B", "A"]

// easy way
function reverseArray(array) {
    return array.reverse();
}
reverseArray(["America", "Freedom", "Liberty"]);
// -> ["Liberty", "Freedom", "America"]

