// Flattening
var arrays = [[1, 2, 3], [4, 5], [6]];
flattened = arrays.reduce(function(a, b) {
    return a.concat(b);
});
// flattened = [1, 2, 3, 4, 5, 6]


