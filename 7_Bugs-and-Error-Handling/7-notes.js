// Strict Mode
function whereIsTheProblem() {
  "use strict";
  for (counter = 0; counter < 10; counter++) {
    console.log("Happy, Happy, Happy");
  }
}
whereIsTheProblem(); // Uncaught ReferenceError: counter is not defined
// Normally, when we forget to put var in front of our variable, as with the counter in the example, JavaScript quietly creates
// a global variable and uses that. In strict mode, an error is reported instead. Hip, hip, hooray!
// -- NOTE -- this doesn't work when the variable in question already exists as a global variable, but only when assigning to it
// -- NOTE -- would have created it.
// Another change in strict mode is that the this binding holds the value undefined in functions that are not called in methods.
// When making such a call outside of strict mode, this refers to the global scope object. So if you accidentally call a method or
// constructor incorrectly in strict mode, JavaScript will produce an error as soon as it tries to read something from this, rather
// than happily working with the global object creating and reading global variables.
// For example, lets take a look at the following code, which calls a constructor without the new keyword so that its this will not
// refer to a newly constructed object:
function Person(name) {
  this.name = name;
};
var me = Person("Sterling"); // oops
console.log(name); // Sterling
// So the bogus call to Person succeeded but returned an undefined value and created the global variable name.
// In strict mode, the result is different.

function Person(name) {
"use strict";
  this.name = name;
};
// Oops, forgot 'new'
var me = Person("Sterling"); // Uncaught TypeError: Cannot set property 'name' of undefined
// Strict mode does a few more things. It disallows giving a function multiple parameters with the same name and removes certain
// problematic language features entirely (such as the with statement).


// Error Propagation
// Say we have a function promptInteger that asks the user for a whole number and returns it. What should it return if the user
// inputs orange?
// One option is to make it return a special value. Common choices for such values are 'null' and 'undefined'.
function promptNumber(question) {
  var result = Number(prompt(question, ""));
  if (isNaN(result)) {
    return null;
  } else {
    return result;
  }
};
promptNumber("What is your favorite number?"); // User input... 24
// 24
promptNumber("What is your favorite number?"); // User input... orange
// null

// There are a couple of issues with return a special value to indicate an error.
// First, what if the function can already return every possible kind of value? For such a function, it is hard to find a special
// value that can be distinguished from a valid result.
// The second issue with returning special values is that it can lead to some very cluttered code. If a piece of code calls
// promptNumber 10 times, it has to check 10 times whether null was returned. And if its response to finding null is to simply return
// null itself, the caller will in turn have to check for it, and so on.


// Exception Handling
// When a function cannot proceed normally, what we would like to do is just stop what we are doing and immediately jump back to a place
// that knows how to handle the problem. This is what exception handling does.
// Exceptions are a mechanism that make it possible for code that runs into a problem to raise (or 'throw') an exception, which is simply
// a value. Raising an exception somewhat resembles a super-charged return from a function: it jumps out of not just the current function
// but also out of its callers, all the way down to the first call that started the current execution.
// This is called 'unwinding the stack'.
// An exception zooms down this stack, throwing away all the call contexts it encounters.
// If exceptions always zoomed right down to the bottom of the stack, they would not be of much use. They would just provide a novel
// way to blow up your program. Their power lies in the fact that you can set "obstacles" along the stack to catch the exception as
// it is zooming down. Then you can do something with it, after which the program continues running at the point where the exception
// was caught.
// Here is an example:
function promptDirection(question) {
  "use strict";
  var result = prompt(question, "");
  if (result.toLowerCase() == "left") {
    return "L";
  } else if (result.toLowerCase() == "right") {
    return "R";
  } else {
    throw new Error("Invalid direction: " + result);
  }
}

function look() {
  if (promptDirection("Which way?") == "L") {
    return "a house";
  } else {
    return "two angry bears";
  }
}

try {
  console.log("You see", look());
} catch(error) {
  console.log("Something went wrong: " + error);
}

// The "throw" keyword is used to raise an exception. Catching one is done by wrapping a piece of code in a "try" block, followed by
// the keyword "catch".
// When the code in the "try" block causes an exception to be raised, the "catch" block is evaluated.
// The variable name (in parentheses) after "catch" will be bound to the exception value.
// After the "catch" block finishes -- or if the "try" block finishes without problems -- control proceeds beneath the entire
// "try"/"catch" statement.

// In the following example, we used the "Error" constructor to create our exception value.
// The "Error" constructor is a standard JavaScript constructor that creates an object with a message property.
// In moder JavaScript environments, instances of the "Error" constructor also gather information about the call stack that existed when
// the exception was created, a so called "stack trace". This information is stored in the stack property and can be helpful when trying
// to debug a problem: it tells us the precise function where the problem occurred and which other functions led up to the call that
// failed.
// -- NOTE -- that the function look completely ignores the possibility that promptDirection might go wrong. This is the big advantage
// -- NOTE -- of exceptions -> error-handling code is necessary only at the point where the error occurs at the point where it is handled
// -- NOTE -- The functions in between can forget all about it.

// Cleaning up after exceptions
// There is one more feature that "try" statements have. They may be followed by a "finally" block either instead of or in addition to a
// a "catch" block. A "finally" block means "No matter what happens, run this code after trying to run the code in the "try" block".
// If a function has to clean something up, the cleanup code should usually be put into the "finally" block.

// Selective Catching
// When an exception makes it all the way to the bottom of the stack without being caught, it gets handled by the environment. What this
// means differs between environments. In browsers, a description of the error typically gets written to the JavaScript console.
// For programming mistakes or problems that the program cannot possibly handle, just letting the error go through is often okay.
// An unhandled exception is a reasonable way to signal a broken program, and the JavaScript console will, provide you with some
// about information about which function calls were on the stack when problem occurred.

// When a "catch" body is entered, all we know is that something in our "try" body caused an exception. But we don't know what, or which
// exception it caused.
// JavaScript does not provide direct support for selectively catching exceptions: either you catch them all or you don't catch any.
// This makes it very easy to assume that exception you get is the one you were thinking about when you wrote the catch block.
// But it might not be. Some other assumptions might be violated, or you might have introduced a bug somewhere that is causing an
// exception.
// Here is an example, which attempts to keep on calling promptDirection until it gets a valid answer:
for (;;) {
  try {
    var dir = promtDirection("Where?") // <- typo!
    console.log("You chose ", dir);
    break;
  } catch(e) {
    console.log("Not a valid direction. Try again.");
  }
}
// The for(;;) construct is a way to intentionally create a loop that doesn't terminate on its own.
// We break out of the loop only when a valid direction is given. But we misspelled "promptDirection", which will result in an
// "undefined variable" error. Because the "catch" block completely ignores its exception value (e), assuming it knows what the problem
// is, it wrongly treats the variable error as indicating bad input. Not only does this cause an infinite loop, but it also "buries" the
// useful error message about the misspelled variable.


// Assertions
// Assertions are a tool to do basic sanity checking for programmer errors.
// Consider this helper function, assert:
function AssertionFailed(message) {
  this.message = message;
}
AssertionFailed.prototype = Object.create(Error.prototype);

function assert(test, message) {
  if (!test) {
    throw new AssertionFailed(message);
  }
}

function lastElement(array) {
  assert(array.length > 0, "empty array in lastElement");
  return array[array.length - 1];
}
// This provides a compact way to enforce expectations, helpfully blowing up the program if the stated condition does not hold.
// For instance, the lastElement function, which fetches the last element from an array, would return undefined on empty arrays if the
// assertion was omitted. Fetching the last element from an empty array does not make much sense, so it almost certainly a programmer
// error to do so.

// Assertions are a way to make sure mistakes cause failures at the point of the mistake, rather than silently producing nonsense values
// that may go on to cause trouble in an unrelated part of the system.


// Throw Statement
// The throw statement throws a user-defined exception. Execution of the current function will stop(the statements after throw won't be
// executed), and a control will be passed to the first catch block in the call stack. If not catch block exists among caller functions,
// the program will terminate.
// Throw Syntax
throw expression;
// expression - the expression to throw.
// Use the throw statement to throw an exception. When you throw an exception, expression specifies the value of the exception.
// Each of the following throws an exception.
throw "Error2"; // generates an exception with a string value
throw 42; // generates an exception with the value 42
throw true; // generates an exception with value target

// Summary
// Throwing an exception causes the call stack to be unwound until the next enclosing "try"/"catch" block or until the bottom of the
// stack. The exception value will be given to the catch block that catches it, which should verify that it is actually the kind of
// exception and then do something with it. To deal with the unpredictable control flow caused by exceptions, finally blocks can be used
// to ensure a piece of code is always run when a block finishes.



