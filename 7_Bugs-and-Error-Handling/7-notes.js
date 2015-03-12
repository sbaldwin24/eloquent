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
// This is called 'unwinding the stack'. An exception zooms down this stack, throwing away all the call contexts it encounters.
// If exceptions always zoomed right down to the bottom of the stack, they would not be of much use. They would just provide a novel
// way to blow up your program. Their power lies in the fact that you can set "obstacles" along the stack to catch the exception as
// it is zooming down. Then you can do something with it, after which the program continues running at the point where the exception
// was caught.


