// The sum of a range

// The introduction of this book alluded to the following as a nice way to compute the sum of a range of numbers:

// console.log(sum(range(1, 10)));
// Write a range function that takes two arguments, start and end, and returns an array containing all the numbers from start up to (and including) end.

// Next, write a sum function that takes an array of numbers and returns the sum of these numbers. Run the previous program and see whether it does indeed return 55.

// As a bonus assignment, modify your range function to take an optional third argument that indicates the “step” value used to build up the array. If no step is given, the array elements go up by increments of one, corresponding to the old behavior. The function call range(1, 10, 2) should return [1, 3, 5, 7, 9]. Make sure it also works with negative step values so that range(5, 2, -1) produces [5, 4, 3, 2].

// Your code here.

// console.log(sum(range(1, 10)));
// → 55
// console.log(range(5, 2, -1));
// → [5, 4, 3, 2]
// Building up an array is most easily done by first initializing a variable to [] (a fresh, empty array) and repeatedly calling its push method to add a value. Don’t forget to return the array at the end of the function.

// Since the end boundary is inclusive, you’ll need to use the <= operator rather than simply < to check for the end of your loop.

// To check whether the optional step argument was given, either check arguments.length or compare the value of the argument to undefined. If it wasn’t given, simply set it to its default value (1) at the top of the function.

// Having range understand negative step values is probably best done by writing two separate loops—one for counting up and one for counting down—because the comparison that checks whether the loop is finished needs to be >= rather than <= when counting downward.

// It might also be worthwhile to use a different default step, namely, -1, when the end of the range is smaller than the start. That way, range(5, 2) returns something meaningful, rather than getting stuck in an infinite loop.

// first way with start and end arguments:

function range(start, end) {
  var array = [];

  if (start > 0) {
    for (var i = 1; i <= end; i++) {
      array.push(i);
    }
  } else {
    for (var i = 1; i >= start; i++) {
      array.push(i);
    }
  }
  return array;
}
range(1, 10);
// -> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// another way with just the start argument
function range(start) {
  var array = [];

  if (start > 0) {
    for (var i = 1; i <= start; i++) {
      array.push(i);
    }
  } else {
    for (var i = 1; i >= start; i++) {
      array.push(i);
    }
  }
  return array;
}
range(24);
// -> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]

// bonus exercise: additional argument 'step'

function range(start, end, step) {
    var array = [];
    if (step == null) {
        step = 1;
    }

    if (start > 0) {
        for (var i = start; i <= end; i += step) {
            array.push(i);
        }
    } else {
        for (var i = start; i >= end; i += step) {
            array.push(i);
        }
    }
    return array;
}

// making sure range works with out providing 'step' argument
range(1, 20);
// -> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

range(1, 24, 2);
// -> [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23]


// range and sum function excercises

function range (start, end, step) {
    var array = [];
    if (step == null) {
        step = 1;
    }

    if (start > 0) {
        for (var i = start; i <= end; i += step) {
            array.push(i);
        }
    } else {
        for (var i = start; i >= end; i += step) {
            array.push(i);
        }
    }
    return array;
}

function sum(array) {
    result = 0;
    for (var i = 0; i < array.length; i++) {
        result += array[i];
    }
    return result;
}
sum(range(1,10));
//-> 55


// included an else if(start == 0) to return 0 through end
function america(start, end, step) {
    var array = [];
    if (step == null) {
        step = 1;
    }

    if (start > 0) {
        for (var i = start; i <= end; i += step) {
            array.push(i);
        }
    } else if (start == 0) {
        start = 1;
        for (var i = start; i <= end; i += step) {
            array.push(i);
        }
    }
    else {
        for (var i = start; i >= end; i += step) {
            array.push(i);
        }
    }
    return array;
}

america(2, 24);


