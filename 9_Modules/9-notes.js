// Why Modules Help
// There are a number of reasons why authors divide their books into chapters and sections.
// These divisions make it easier for a reader to see how the book is built up and to find specefic parts that they are interested in.
// They also help the author by providing a clear focus for every section.

// The benefits of organizing a program into several files or modules are similiar.
// Structure helps people who are not yet familiar with the code find what they are looking for and makes it easier for the programmer
// to keep things that are related close together.



// Namespacing
// Most modern programming languages have a scope level between global (everyone can see it) and local (only functions can see it).
// JavaScript does not. Thus, by default, everything that needs to be visible outside of the scope of a top-level function is visible
// everywhere.

// Namespace pollution, the problem of a lot of unrelated code having to share a signle set of global variable names, was mentioned in
// Chapter 4, where the Math object was given as an example of an object that acts like a module by grouping math-related
// functionality.

// Though JavaScript provides no actual module construct yet, objects can be used to create publicly accessible subnamespaces, and
// functions can be used to create an isolated, private namespace inside of a module.
