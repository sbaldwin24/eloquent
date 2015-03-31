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



// Slow-Loading Modules
// Though it is possible to use the CommonJS module style when writing JavaScript for the browser, it is somewhat involved.
// The reason for this is that reading a file (module) from the Web is a lot slower than reading it from the hard disk.
// While a script is running in the browser, nothing else can happen to the website on which it runs.
// This means that if every require call went and fetched something from some faraway server, the page would freeze for a painfully long
// time wile loading its scripts.

// One way to work around this problem is to run a program like Browserify on your code before you serve it on a web page.
// This will look for calls to require, resolve all dependencies, and gather the needed code into a single big file. The website itself can
// simply load this file to get all the modules it needs.

// Another solution is to wrap the code that makes up your module in a function so that the module loader can first load its dependencies
// in the background and then call the function, initializing the module, when the dependencies have been loaded. That is what the
// Asynchronus Module Definition (AMD) module does.

// Our trivial program with dependencies would like this in AMD:
define(["weekDay", "today"], function(weekDay, today) {
    console.log(weekDay.name(today.dayNumber()));
});

// The define function is central to this approach.
// It takes first an array of module names and then a function that takes one arguemnt for each dependency.
// It will load the dependencies (if they have not already been loaded) in the background, allowing the page to continue working while the
// the files are being fetched.
// Once all dependencies are loaded, define will call the function it was given, which the interfaces of those dependencies as arguments.

// The modules that are loaded using AMD must themselves contain a call to define.
// The value used as their interface is whatever was returned by the function passed to define.
// Here is the weekDay module again:
define([], function() {
     var names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
     return {
        name: function(number) {
            return names[number];
        },
        number: function(name) {
            return names.indexOf(name);
        }
     };
});

// For the purpose of keeping track of modules while they are being loaded, the implementation of define will use object s that describe
// the state of modules, telling us whether they are available yet and providing their interface when they are.

// To be able to show a minimal implementation of define, we will pretend we have a backgroundReadFile function that takes a filename and
// a function and calls the function with the content of the file as soon as it has finished loading it.

// The getModule function, when given a name, will return such an object and ensure that the module is schedule to be loaded.
// It uses a cache object to avoid loading the same module twice.

var defineCache = Object.create(null);
var currentMod = null;

function getModule(name) {
    if (name in defineCache) {
        return defineCache[name];
    }

    var module = {
        exports: null,
        loaded: false,
        onLoad:[]
    };
    backgroundReadFile(name, function(code) {
        currentMod = module;
        new Function("", code());
    });
    return module;
};

// We assume the loaded file also contains a single call to define. The currentMod variable is used to tell this call about the module
// object that is currently being loaded so that it can update this object when it finished loading.

// The define function itself uses getModule to fetch or create the module objects for the current module's dependencies.
// Its task is to schedule the moduleFunction (the function that contains the module's actual code) to be run whenever those dependencies
// are loaded. For this purpose, it defines a function whenDepsLoaded that is added to the onLoad array of all dependencies that not yet
// loaded. This function immediately returns if there are still unloaded dependencies, so it will do actual work only once, when the last
// dependency has finished loading. It is also called immediately from define, itself, in case there are no dependencies that need to be
// loaded.
// ~
function define(depNames, moduleFunction) {
    var myMod = currentMod;
    var deps = depNames.map(getModule);

    deps.forEach(function(mod) {
        if (!mod.loaded) {
            mod.onLoad.push(whenDepsLoaded);
        }
    });

    function whenDepsLoaded() {
        if (!deps.every(function(m) {
            return m.loaded;
        }))
        return;

        var args = deps.map(function(m) {
            return m.exports;
        });
        var exports = moduleFunction.apply(null, args);
        if (myMod) {
            myMod.exports = exports;
            myMod.loaded = true;
            myMod.onLoad.forEach(function(f) {
                f();
            });
        }
    }
    whenDepsLoaded();
}
// When all dependencies are available, whenDepsLoaded calls the function that holds the module, giving it the dependencies' interfaces as
// arguments.

// The first thing define does is store the value that currentMod had when it was called in a variable myMod.
// Remember that getModule, just before evaluating the code for a module, stored the corresponding module object in currentMod.



// Switching up to Rob Dodson's explanation of RequireJS -- Embracing the Awesomeness of Asynchronus Modules
// Asynchronus Module Definitions
define(id?, dependencies?, factory);
// Give our module a unique id (which is really just a path).
// ~
define("path/to/module", function() {

});
// RequireJS discourages the use of module ids.

// Dependencies
// List any dependencies in an Array and RequireJS will automatically inject them into our module.
// ~
// jquery assigned to $
// d3 assigned to d3
define(["jquery", "d3"], function($, d3) {

});

// The Factory Function
// Called once per module. If the factory function returns anything then that object should be assigned as the export value for the module.
// ~
define(["jquery", "d3"], function($) {

    return {
        name: "Foo"
        // whatever is return here is
        // the exported value of the module
    }

});

// Things We can do with the Factory Function
// Return an Object
// ~
// person.js
define(function() {
    return {
        name: "Sterling"
        sayHello: function() {
            alert("Hi, my name is " + this.name);
        }
    }
});

// app.js
define(["person"], function(person) {
    person.sayHello(); // alerts "Hi, my name is Sterling"
});


// Return a Function
// ~
// sum.js
define(function() {

    return function(a,b) {
        alert(a + b);
    }

});
// ~
// calculator.js
define(["sum"], function(sum) {

    sum(2,2); // alerts 4

});

// Return Constructors!
// ~
define(function() {

    function Person(name) {
        this.name = name;
        this.sayHello = function() {
            console.log("Hello, my name is " + this.name);
        }
    }

    return Person;
});
// ~
// app.js
define(["person"], function(Person) {
    var sterling = new Person("Sterling");
    sterling.sayHello(); // "Hello, my name is Sterling"
});

// Create Private Variables and Functions
// ~
// basket.js
define(function() {
    // Private
    var counter = 0;

    function getCounter() {
        return counter;
    }

    function incrementCounter() {
        counter++;
    }

    // Public
    return {
        count: function() {
            return getCounter(); // return value of private variable
        },
        addToCart: function() {
            incrementCounter(); // call private function
        }
    };
});

// Make a jQuery Plugin
//  ~
// awesomePlugin.js
define(["jquery"], function($) {

    // $.fn is shorthand for jQuery.prototype
    $.fn.awesomePlugin =  function() { ... };

});

// app.js
define(["jquery", "awesomePlugin"], function($) {
    $("module").awesomePlugin();
});

// Ditch the Factory Function and Just Return an Object!
// We can skip the factory function and just return an object. This helps us avoid a lot of boiler plate code.
// ~
// presentation.js
define({
    title: "Required",
    presenter: "Sterling Baldwin",
    location: "Dallas, Texas".
    rating: "Probably the best presentation I've ever heard."
});

// app.js
define(["presentation"], function(presentation) {
    console.log(presentation.presenter); // "Sterling Baldwin"
});

// Some GOTCHAS!
// Dependency Order Matters!
// ~
define(["jquery", "someJQueryPlugin"], function($) {
    /* $ is mapped to the first dependency, which is jquery */
});

// What would happen if we did this?
// this is a bad example or it will not work
define(["someJQueryPlugin", "jquery"], function($) {
    // $ is mapped to the first dependecy, which returns undefined
    // because it is a plugin!!
});
// BEST PRACTICE -- put things that will return a value first and things that do not at the end.

// Don't Mix Async and Synchronous Code
// ~
// index.html
require(["jquery", "widget", "highcharts"], function($, widget) {
    /* do something interesting with jquery */
    // this code is fine
});

// <!-- Breaks because Highcharts hasn't loaded yet -->
<script src="someHighchartsPlugin.js"></script>

// <!-- Breaks because widgets hasn't loaded yet and isn't available in this scope -->
<script type="text/javaScript">
    widget.doSomething();
</script>
// this code will break

// to remedy this...
require(["jquery", "widget", "highcharts", "someHighchartsPlugin"], function($, widget) {

    /* do something interesting with jquery */
    widget.doSomething();

});
// Use shims or define your own AMD modules instead of mixing Async and Synchronous Code
// When using RequireJS avoid using <script> tags as much as possible!

// Beware of Circular Dependencies!
// ~
// moduleA.js
define(["moduleB"], function(moduleB) {

    /* do something interesting with moduleB */

});

// moduleB.js
define(["moduleA"], function(moduleA) {

    /* value for moduleA is undefined!!! */

});


// CONFIGURATION

// BaseURL
// Tell RequireJS where to find our modules.
// Take this example structure of our web application
/* example structure
www/
    assets/
        css/
        js/
            app/
                main.js/
            vendor/
                bootstrap.js
        img/
    index.html
*/
// config.js
requirejs.config({
    baseUrl: "./assets/js"
    // start here
});

// index file
require(["app/main", "vendor/bootstrap"]);


// Paths
// Shortcut frequently used paths to tidy up our code.
// if you are a lazy developer, we could write ...
// ~
// config.js
requirejs.config({
    baseUrl: "./assets/js",
    paths: {
        "bootstrap": "vendor/bootstrap"
    }
});


// Shim
// Shiming allows us to load non-AMD libraries in the correct order.
// ~
// config.js
requirejs.config({
    baseUrl: "./js",
    paths: {
        "highstock": "../components/highstock",
        "jquery":    "../components/jquery"
    },
    shim: {
        "highstock": ["jquery"]
    }
});


// Single-Page Application
// To load RequireJS into our single page application, we would do this...
// ~
// config.js
requirejs.config({
    baseUrl: "./js",
    // dependencies
    deps: ["app/main"],
    paths: {
        "bootstrap": "../components/bootstrap/js",
    },
    shim: {
        "highstock": ["jquery"]
    }
});

// index.html
// Notice the data-main
<script data-main="js/config.js" src="js/vendor/require.js"></script>

// Done with Rob, jumping back to EloquentJS


// Summary
// There are two popular, well-defined approaches to such modules.
// One is called CommonJS Modules and revolves around a require function that fetches a module by name and returns its interface.
// The other is called AMD and uses a define function that takes an array of module names and a function and, after loading the modules,
// runs the function with their interfaces as arguments.




