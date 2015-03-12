// Strict Mode
function whereIsTheProblem() {
  "use strict";
  for (counter = 0; counter < 10; counter++) {
    console.log("Happy, Happy, Happy");
  }
}
whereIsTheProblem(); // Uncaught ReferenceError: counter is not defined
// Normally, when we forget to put var in front of our variable, as with the counter in the example, JavaScript quitely creates
// a global variable and uses that. In strict mode, an error is reported instead. Hip, hip, hooray!
// -- NOTE -- this doesn't work when the variable in question already exists as a global variable, but only when assigning to it
// -- NOTE -- would have created it.
// Another change in strict mode is that the this binding holds the value undefined in functions that are not called in methods.
// When making such a call outside of strict mode, this refers to the global scope object. So if you accidentally call a method or
// constructor incorrectly in strict mode, JavaScript will produce an error as soon as it tries to read something from this, rather
// than happily working with the global objectm creating and reading global variables.
// For example, lets take a look at the following code, which calls a constructor without the new keyword so that its this will not
// refer to a newly constructed object:
function Person(name) {
  this.name = name;
};
var me = Person("Sterling"); // oops
console.log(name); // Returns Sterling
// So the bogus call to Person succeeded but returned an undefined value and created the global variable name.
// In strict mode, the result is different.

function Person(name) {
"use strict";
  this.name = name;
};
// Oops, forgot 'new'
var me = Person("Sterling"); // Returns Uncaught TypeError: Cannot set property 'name' of undefined
// Strict mode does a few more things. It disallows giving a function multiple parameters with the same name and removes certain
// problematic language features entirely (such as the with statement).
