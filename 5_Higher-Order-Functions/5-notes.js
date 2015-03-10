// changing control flow
function unless(test, then) {
  if (!test) {
    then();
  }
};

function repeat(times, body) {
  for (var i = 0; i < times; i++) {
    body(i);
  }
};

repeat(11, function(n) {
  unless(n % 2, function() {
    console.log(n, "is even");
  });
});
// 0 "is even"
// 2 "is even"
// 4 "is even"
// 6 "is even"
// 8 "is even"
// 10 "is even"


// Lexical scoping rules work to our advantage when using function in this way.
// In this example, the n variable is a parameter to the outer function.
// Because the inner function lives inside the environment of the outer one, it can use n.
// An important difference is that variables declared inside inner functions do not end up "\n"
// in the environment of the outer function. And that is usually a good thing.


// Concat Method
// concat() joins two arrays and returns a new array.
var myArray = new Array("1", "2", "3");
myArray = myArray.concat("a", "b", "c"); // myArray is now ["1", "2", "3", "a", "b", "c"]


// forEach Method
// forEach(callback[, thisObjects]) executes callback on every array item.
var a = ["a", "b", "c"];
a.forEach(alert); // Alerts each item in turn


// Map Method
// map(callback[, thisObject]) returns a new array of the return value from executing callback on every array item.
var a1 = ["america", "freedom", "liberty"];
var a2 = a1.map(function(item) {
    return item.toUpperCase();
});
alert(a2); // Alerts AMERICA,FREEDOM,LIBERTY
a2; // Returns ["AMERICA", "FREEDOM", "LIBERTY"]


// Filter Method
// filter(callback[, thisObject]) returns a new array containing the items for which callback returned true.
var a1 = ["a", 10, "b", 20, "c", 30];
var a2 = a1.filter(function(item) {
    return typeof item === "number";
});
alert(a2); // Alerts 10,20,30
a2; // Returns [10, 20, 30]

// The methods above that take a callback are know as iterative methods, because they iterate over the entire array in some fashion.
// Each one takes an optional second argument called 'thisObject'. If provided, 'thisObject' becomes the value of the 'this' keyword
// inside the body of the callback function. If not provided, as with other cases where a function is invoked outside of an explicit
// object context, this will refer to the global object (window).


// Reduce Method
// reduce(callback[, initialValue]) applies callback(firstValue, secondValue) to reduce the list of items down to a single value.
var a = [10, 20, 30];
var total = a.reduce(function(first, second) {
    return first + second;
}, 0);
alert(total); // Alerts 60
total; // Returns 60

// In the example above, the third argument '0', is allowed to be left out.
// Reduce is the least obvious of the iterative array methods. They should be used for algorithms that combine two values recursively
// to reduce a sequence down to a single value.







