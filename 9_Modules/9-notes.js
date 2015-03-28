// Why Modules Help
// There are a number of reasons why authors divide their books into chapters and sections.
// These divisions make it easier for a reader to see how the book is built up and to find specific parts
// that they are interested in.
// They also help the author by providing a clear focus for every section.

// The benefits of organizing a program into several files or modules are similar.
// Structure helps people who are not yet familiar with the code find what they are looking for and makes
// it easier for the programmer
// to keep things that are related close together.



// Namespacing
// Most modern programming languages have a scope level between global (everyone can see it) and local (
// only functions can see it).
// JavaScript does not. Thus, by default, everything that needs to be visible outside of the scope of a top
// -level function is visible everywhere.

// Namespace pollution, the problem of a lot of unrelated code having to share a single set of global
// variable names, was mentioned in Chapter 4, where the Math object was given as an example of an object
// that acts like a module by grouping math-related functionality.

// Though JavaScript provides no actual module construct yet, objects can be used to create publicly
// accessible sub-namespaces, and functions can be used to create an isolated, private namespace inside of
// a module.


// Reusse
// In a "flat" project, which isn't structured as a set modules, it is not apparent which parts of the code are needed to use a
// particular function. In the previous chapter, we wrote a function for reading configuration files. If we wanted to use that function
// in another project, we must go and copy out the parts of the old program that look like they are relevant to the functionality that
// we need and paste them into our new program. Then, if we find a mistake in that code, we will fix it only in whichever program that
// we are working with at the time and forget to also fix it in the other program.

// Once you have lots of such shared, duplicated pieces of code, you will find yourself wasting a lot of time and energy on moving them
// around and keeping them up-to-date.

// Putting pieces of functionality that stand on their own into separate files and modules make them easier to track, update, and share
// because all the various pieces of code that want to use the module load it from the same actual file.

// This idea get even more powerful when the relations between modules -- which other modules each module depends on -- are explicitly
// stated. You can then automate the process of installing and upgrading external modules (libraries).

// Taking this idea even further, imagine an online service that track and distributes hundreds of thousands of such libraries,
// allowing us to search for the functionality we need and, one we find it, set up our project to automatically download it.

// NPM!



// Decoupling
// Another important role of modules is isolating pieces of code from each other. A well-designed module will provide an interface
// for external code to use. As the module gets updated with bug fixes and new functionality, the existing interface stays the same
// (it is stable) so that the other modules can use the new, improved version without any changes to themselves.

// --NOTE-- A stable interface does not mean no new functions, methods, or variables are added. It just means that existing
// functionality is not removed and its meaning is not changed.

// A good module interface should allow the module to grow without breaking the old interface. This means exposing as few of the
// module's internal concepts as possible wile also making the "language" that the interface exposes powerful and flexible enough to be
// applicable in a wide range of situations.

// For interfaces that expose a single, focused concept, such as a configuration file reader, this design comes naturally. For others,
// such as a text editor, which has many different aspects that external code might need to access (content, styling, user actions),
// it requires careful design.



// Using Functions as Namespaces
// Functions are the only things in JavaScript that create a new scope. So if we want our modules to have their own scope, we will
// have to base them on functions.

// Consider this trivial module for associating names with day-of-the week numbers, as returned by a Date object's getDay method:
var names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
function dayName(number) {
    return names[number];
};
console.log(dayName(1));
// -> Monday
// The dayName function is part of the module's interface, but the names variable is not. We would prefer not to spill it into the
// global scope (EVIL).


// We can do this:
var dayName = function() {
    var names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return function(number) {
        return names[number];
    };
}();
dayName(1);
// -> "Monday"
// Now names is a local variable in an anonymous function. This function is created and immediately called, and return value (the
// actual dayName function) is stored in a variable. We could have pages and pages of code in this function, with 100 local variables,
// and they would all be internal to our module -- visible to module itself but not to outside code.

// We can use a similar pattern to isolate code from the outside world entirely. The following module logs a value to the console
// but does not actually provide any values for other modules to use:
(function() {
    function square(x) {
        return x * x;
    }
    var hundred = 100;
    console.log(square(hundred));
})();
// -> 10000
// This code simply outputs the square of 100, but in the real world it could be a module that adds a method to some prototype or set
// up a widget on a webpage. It is wrapped in a function to prevent the variables it uses internally from polluting the global scope.

// Why did we wrap the namespace function in a pair of parentheses?
// This has to do with a quirk in JavaScript's syntax.
// If an expression starts with the keyword function, it is a function expression.
// However, if a statement starts with function, it is a function declaration, which requires a name and, not being an expression,
// cannot be called by writing parentheses after it. You can think of the extra wrapping parentheses as a trick to force the function
// to be interpreted as an expression.



// Objects as Interfaces
// Imagine that we want to add another function to our day-of-the-week module, one that goes from a day name to a number.
// We can not simply return the function anymore but must wrap the two functions in an object.

var weekDay = function() {
    var names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    return {
        name: function(number) {
            return names[number];
        },
        number: function(name) {
            return names.indexOf(name);
        }
    };
}();
// Calling weekDay function
weekDay.name(weekDay.number("Sunday"));
// -> Sunday
weekDay.number("Tuesday");
// -> 2
weekDay.name(4);
// -> Thursday

// Practicing... returning the values of the private variable names with getValues
var weekDay = function() {
    var names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return {
      name: function(number) {
        return names[number];
      },
      number: function(name) {
        return names.indexOf(name);
      },
      getValues: function() {
        return names;
      }
    };
}();

// Let's get those values
weekDay.getValues();
// -> ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

// For bigger modules, gathering all the exported values into an object at the end of the function becomes awkward since many of the
// exported functions are likely to be big and we would prefer to write them somewhere else, near related internal code.
// A convenient alternative is to declare an object (conventionally named exports) and add properties to that whenever we are defining
// something that needs to be exported. In the following example, the module function takes an interface object as an argument, allowing
// code outside of the function to create it and store it in a variable. (Outside of a function, this refers to the global scope object).

(function(exports) {
    var names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    exports.name = function(number) {
        return names[number];
    };
    exports.number = function(name) {
        return names.indexOf(name);
    };
})(this.weekDay = {});

weekDay.name("Saturday");
// -> 6



// Detaching From the Global Scope (The Global Scope is evil)
// The previous pattern is commonly used by JavaScript modules intended for the browser. The module will claim a single global variable
// and wrap its code in a function in order to have its own private namespace. But this pattern still causes problems if multiple modules
// happen to claim the same name or if you want to load two versions of a module alongside each other.

// With a little plumbing, we can create a system that allows one module to directly ask for the interface object of another module,
// without going through the global scope.
// Our goal is a require function that, when given a module name, will load that module's file (from disk or the Web, depending on the
// platform we are running on) and return the appropriate interface value.

// This approach solves the problems mentioned previously and has the added benefits of making our program's dependencies explicit, making
// it harder to accidentally make use of some module without stating that we need it.

// For require we need two things.
// First, we want a function readFile, which returns the content of a given file as a string (A single function is present in standard
// JavaScript, but different JavaScript environments, such as the browser and Node.js, provide their own ways of accessing files. For now
// let's just pretend we this function.)
// Second, we need to be able to actually execute this string as JavaScript code.



// Evaluating Data as Code
// There are several ways to take data (a string of code) and run it as part of the current program.

// The most obvious way is the special operator eval, which will execute a string of code in the current scope. This is usually a bad idea
// because it breaks some of the sane properties that scopes normally have, such as being isolated from the outside world.

function evalAndReturnX(code) {
    eval(code);
    return x;
};

console.log(evalAndReturnX("var x = 24"));
// -> 24

// A better way of interpreting data as code is to use the Function constructor.
// This takes two arguments: a string containing a comma-seperated list of argument names and a string containing the function's body.

var plusOne = new Function("n", "return n + 1;");

console.log(plusOne(4));
// -> 5
// This is precisely what we need for modules. We can wrap a module's code in a function, with that function's scope becoming our module
// scope.



// Require
// The following is a minimal implementation of require:

function require(name) {
    var code = new Function("exports", readFile(name));
    var exports = {};
    code(exports);
    return exports;
};

console.log(require("weekDay").name(1));
// -> Monday

// Since the new Function constructor wraps the module code in a function, we do not have to write a wrapping namespace function in the
// module file itself. And since we make exports an argument to the module function, the module does not have to declare it.
// This removes a lot of clutter from our example module.

var names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
expors.name = function(number) {
    return names[number];
};
exports.number = function(name) {
    return names.indexOf(name);
};


// When using this pattern, a module typically starts with a few variable declarations that load the modules it depends on.
var weekDay = require("weekDay");
var today = require("today");

console.log(weekDay.name(today.dayNumber()));
// This simplistic implementation of require given previously has several problems.
// For one, it will load and run a module every time it is required, so if several modules have the same dependency or a require call is
// inside a function that will be called multiple times, time and energy will be wasted.

// This can be solved by storing the modules that have already been loaded in an object and simply return the existing value when one is
// loaded multiple times.

// The second problem is that it is not possible for a module to directly export a value other than the exports object, such as a function.
// For example, a module might want to export only the constructor of the object type it defines.
// Right now, it cannot do that because require always uses the export object it creates as the exported value.

// The traditional solution for this is to provide modules with another variable, module, which is an object that has a property exports.
// This property initially points at the empty object created by require but can be overwritten with another value in order to export
// something else.
function require(name) {
    if (name in require.cache) {
        return require.cache[name];
    }
    var code = new Function("exports, module", readFile(name));
    var exports = {}, module = {exports: exports};
    code(exports, module);

    require.cache[name] = module.exports;
    return module.exports;
};
require.cache = Object.create(null);

// We not have a module system that uses a single global variable (require) to allow modules to find and use each other without going
// through the global scope.

// This style of module system is called RequireJS modules, after the pseudo-standard that first specified it.
// It is built into the Node.js system. Real implementations do a lot more than the example I showed.
// Most importantly, they have a much more intelligent way of going from a module name to an actual piece of code, allowing both
// pathnames relative to the current file and module names that point directly to locally installed modules.



