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
