// Why Modules Help
// There are a number of reasons why authors divide their books into chapters and sections.
// These divisions make it easier for a reader to see how the book is built up and to find specific parts that they are interested in.
// They also help the author by providing a clear focus for every section.

// The benefits of organizing a program into several files or modules are similar.
// Structure helps people who are not yet familiar with the code find what they are looking for and makes it easier for the programmer
// to keep things that are related close together.



// Namespacing
// Most modern programming languages have a scope level between global (everyone can see it) and local (only functions can see it).
// JavaScript does not. Thus, by default, everything that needs to be visible outside of the scope of a top-level function is visible
// everywhere.

// Namespace pollution, the problem of a lot of unrelated code having to share a single set of global variable names, was mentioned in
// Chapter 4, where the Math object was given as an example of an object that acts like a module by grouping math-related
// functionality.

// Though JavaScript provides no actual module construct yet, objects can be used to create publicly accessible sub-namespaces, and
// functions can be used to create an isolated, private namespace inside of a module.


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

//
