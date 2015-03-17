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
// stated. You can then automate the process of intalling and upgrading external modules (libraries).

// Taking this idea even further, imagine an online service that track and distributes hundreds of thousands of such libraries,
// allowing us to search for the functionality we need and, one we find it, set up our project to automatically download it.

// NPM!



// Decoupling
// Another important role of modules is isolating pieces of code from each other. A well-designed module will provide an interface
// for external code to use. As the module gets updated with bug fixes and new functionality, the existing interface stays the same
// (it is stable) so that the other modules can use the new, improved version without any changes to themselves.

// --NOTE-- A stable interface does not mean no new functions, methods, or variables are added. It just means that existing
// functionality is not removed and its meaning is not changed.

// A good module interface should allow the module to grow without breaking the old interface. This means exposing as few othe module's
// internal concepts as possible wile also making the "language" that the interface exposes powerful and flexible enough to be
// applicable in a wide range of situations.

// For interfaces that expose a single, focused concept, such as a configuration file reader, this design comes naturally. For others,
// such as a text editor, which has many different aspects that external code might need to access (content, styling, user actions),
// it requires careful design.
