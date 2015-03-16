// Regular Expressions
// Regular expressions are used with methods to search, replace, and extract information from strings.
// The methods that work with regular expressions are, regexp.exec, regexp.test, string.match, string.replace, string.search, and
// string.split.
// -- NOTE -- Regular expressions usually have a significant performance advantage over equivalent string operations in JavaScript.
// Creating a Regular Expression
// You construct a regular expression in one of two ways:
// Using a regular expression literal, as follows:
var re = /ab+c/;
// Regular expression literals provide compilation of the regular expression when the script is loaded.
// When the regular expression will remain constant, use this for better performance.

// Calling the constructor function of the RegExp object, as follows:
var re = new RegExp("ab+c");
// Using the constructor function provides runtime compilation of the regular expression.
// Use the constructor function when you know the regular expression pattern will be changing, or you don't know the pattern and
// are getting it from another source, such as user input.


// Testing for Matches
// Regular expression objects have a number of methods. The simplest one is "test". If you pass it a string, it will return a Boolean
// telling you whether the string contains a match of the pattern in the expression.
console.log(/abc/.test("abcde")); // Returns true

console.log(/abc/.test("abxde")); // Returns false

console.log(/abc/.test("ffffffffabcffffff")); // Returns true

// A regular expression consisting of only non-special characters simply represents that sequence of characters. If "abc" occurs
// anywhere in the string we are testing against (not just at the start), test will return true.

// Matching a Set of Characters
// Finding out whether a string contains "abc" could just as well be done with a call to "indexOf". Regular expressions allow us to go
// beyond that and express more complicated patterns.

// Say we want to match any number. In a regular expression, putting a set of characters between square brackets makes that part of the
// expression match any of the characters between the brackets.

// Both of the following expressions match all strings that contain a digit:
console.log(/[0123456789]/.test("in 1992")); // Returns true

console.log(/[0-9]/.test("in 1992")); // Returns true
// Within square brackets, a dash (-) between characters can be used to indicate a range of characters, where the ordering is
// determined by the character's Unicode number. Characters 0 to 9 sit right next to each other in this ordering (codes 48-57),
// so [0-9] covers all of them and matches any digit.

// There are a number of common character groups that have their own built-in shortcuts.
// Digits are one of them: "\d" means the same thing as [0-9].
// "\d" --> Any digit character
// "\w" --> An alphanumeric character("word character")
// "\s" --> Any whitespace character (space, tab, newline, and similar)
// "\D" --> A character that is not a digit
// "\W" --> A non-alphanumeric character
// "\S" --> A non-whitespace character
// "." --> Any character except for a new line

// So you could match a date and time format like 30-01-2003 15:20 with the following expression:
var dateTime = /\d\d-\d\d-\d\d\d\d \d\d:\d\d/;
console.log(dateTime.test("30-01-2003 15:20"));     // Returns true
console.log(dateTime.test("30-jan-2003 15:20"));    // Returns false

// Wow this looks awful!
// It has way too many backslashes, producing background noise that makes it hard to spot the actual pattern expresses.
// These backslash codes can also be used inside square brackets. For example, [\d.] means any digit or a period character.
// But --NOTE-- that the period itself, when used between square brackets, loses its special meaning. The same goes for other special
// characters, such as +.
// To invert a set of characters -- that is, to express that you want to match any character except the ones in the set -- you can
// write a caret(^) character after the opening brackets.
var notBinary = /[^01]/;
console.log(notBinary.test("1100100010100110")); // Returns false
console.log(notBinary.test("1100100010200110")); // Returns true --> notice the 2?


// Repeating Parts of a Pattern
// We now know how to match a single digit. What if we want to match a whole number -- a sequence of one or more digits?

// When you put a plus sign (+) after something in a regular expression, it indicates that the element may be repeated more that once.
// Thus, "/\d+/" matches one or more characters.
console.log(/'\d+'/.test("'123'")); // Returns true
console.log(/'\d+'/.test("''"));    // Returns false
console.log(/'\d*'/.test("'123'")); // Returns true
console.log(/'\d*'/.test("''"));    // Returns true
// The star (*) has a similar meaning but also allows the pattern to match zero times. Something with a start after it never prevents
// a pattern from matching -- it will just match zero instances if it can not find any suitable text to match.

// A question mark makes a part of a pattern "optional", meaning it may occur zero or one time. In the following example, the "u"
// character is allowed to occur, but the pattern also matches when it is missing.
var neighbor = /neighbou?r/;
console.log(neighbor.test("neighbour"));    // Returns true
console.log(neighbor.test("neighbor"));     // Returns true
console.log(neighbor.test("neighbokr"));    // Returns false

// To indicate that a pattern should occur a precise number of times, use curly braces.
// Putting {4} after an element, for example, requires it to occur exactly four times.
// It is also possible to specify a range this way: {2,4} --> means the element must occur at least twice and at most four times.

// Here is another version of the date and time pattern that allows both single and double-digit days, months, and hours.
var dateTime = /\d{1,2}-\d{1,2}-\d{4}\s\d{1,2}:\d{2}/;
console.log(dateTime.test("30-1-2003 8:45")); // Returns true
// You can also specify open-ended ranges when using curly braces by omitting the number on either side of the comma.
// So {,5} means zero to five times, and {5,} means five or more times.

// Example from JavaScript the Good Parts pg.66
var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)
(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
// --NOTE-- Regular expressions cannot be broken into smaller pieces the way that functions can, so "parse_url" is a long one.
var url = "http://www.ora.com:80/goodparts?q#fragment";
// Let's call parse_url's exec method. If it is successfully matches the string that we pass it, it will return an array containing
// pieces extracted from the url:
var url = "http://www.ora.com:80/goodparts?q#fragment";

var result = parse_url.exec(url);
var names = ["url", "scheme", "splash", "host", "port", "path", "query", "hash"];

var blanks = "            ";
var i;

for (var i = 0; i < names.length; i += 1) {
    document.writeln(names[i] + ":" + blanks.substring(names[i].length), result[i]) + "\n";
}
// This produces:
url: "http://www.ora.com:80/goodparts?q#fragment"
scheme: "http"
splash: "//"
host: "www.ora.com"
port: "80"
path: "goodparts"
query: "q"
hash: "fragment"


// var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;

// Let's factor parse_url into its parts to see how it works:
// The "^" character indicates the beginning of the string. It is an anchor that prevents "exec" from skipping over a
// non-URL-like prefix:
^(?:([A-Za-z]+):)?
// This factor matches a scheme name, but only if it is followed by a : (colon).
// The (?:...) indicates a non-capturing group. The suffix ? indicates that the group is optional. It means repeat zero or one time.
// The (...) indicates a capturing group. A capturing group copies the text it matches and places it in the result array.
// Each capturing group is given a number. This first capturing group is 1, so a copy of the text matched by this capturing group
// will appear in result[1].
// The [...] indicates a character class. This character class, A-Za-z, contains 26 uppercase letters and 26 lowercase letters.
// The hyphens indicate ranges, from A to Z.
// The suffix + indicates that the character class will be matched one or more times.
// The group is followed by the : character, which will be matched literally:
(\/{0,3})
// The next factor is the capturing group 2. "\/" indicates that a / (slash) character should be matched.
// It is escaped with \ (backslash) so that it is not misrepresented as the end of the regular expression literal.
// The suffix {0,3} indicates that / will matched 0 or 1 or 2 or 3 times:
([0,9.\-A-Za-z]+)
// The next factor is capturing group 3. It will match a host name, which is made up of one or more digits, letters or "." or "-".
// The "-" was escaped as \- to prevent it from being confused with a range hyphen:
(?::(\d+))?
// The next factor optionally matches a port number, which is a sequence of one or more digits preceded by a ":".
// "\d" represents a digit character.
// The series of one or more digits will be capturing group 4:
(?:\/([^?#]*))?
// We have another optional group. The one begins with a "/".
// The character class [^?#] begins with a ^, which indicates that the class includes all characters except for ? and #.
// The * character indicates that the character class is matched zero or more times.

// --NOTE-- Crawford is being sloppy here. The class of all characters except for ? and # includes line-ending characters,
// control characters and lots of other characters that really shouldn't be matched here.
// Most of the time this will do what we want, but there is a risk that some bad text could slip through.
// Sloppy regular expressions are a popular source of security exploits. It is a lot easier to write sloppy regular expressions than
// rigorous regular expressions:
(?:\?([^#]*))?
// Next, we have an optional group that begins with a ?.
// It contains capturing group 6, which contains zero or more characters that are not #:
(?:#(.*))?
// We have a final optional group that begins with #.
// The . will match any character except a line-ending character:
$
// The $ represents the end of the string. It assures us that there was no extra material after the end of the URL.
// Those are the factors of the regular expression parse_url.
// It is possible to make regular expressions more complex than parse_url but Crawford doesn't recommend it.
// Regular expressions are best when they are short and simple. Only then can we have confidence that they are working correctly and
// that they could be successfully modified if necessary.

// Let's look at another example: a regular expression that matches numbers. Numbers can have an integer part with an optional minus
// sign, an optional fractional part, and an optional exponent part:
var parse_number = /^-?\d+(?:\.\d*)?(?:e[+\-]?\d+)?$/i;

var test = function(num) {
    document.writeln(parse_number.test(num));
};
test("1");              // Returns true
test("number");         // Returns false
test("98.6");           // Returns true
test("132.21.86.100");  // Returns false
test("123.45E-67");     // Returns true
test("123.45D-67");     // Returns false
// parse_number successfully identified the strings that conformed to our specification and those that did not, but for those that
// did not, it gives us no information on why or where they failed the number test.
// Let's break parse_number down:
/^   $/i
// We again use ^ and $ to anchor the regular expression. This causes all of the characters in the text to be matched against the
// regular expression.
// If we had omitted the anchors, the regular expression would tell us if a string contains a number.
// With the anchors, it tell s us if the string contains only a number.
// If we included just the ^, it would match strings starting with a number.
// If we included just the $, it would match strings ending with a number.
// The i flag causes case to be ignored when matching letters. The only letter in our pattern is e. We want that e to match E. We
// could have written the e factor as [Ee] or [?:E|e], but we didn't have to because we used the i flag:
-?
// The ? suffix on the minus sign indicates that the minus sign is optional:
\d+
// \d means the same as [0-9]. It matches a digit. The + suffix causes it to match one or more digits:
(?:\.\d*)?
// The (?...)? indicates an optional non-capturing group. It is usually better to use non-capturing groups instead of a less ugly
// capturing groups because capturing has a performance penalty. The group will match a decimal point followed by a zero or more
// digits:
(?:e[+\-]?\d+)?
// This is another optional non-capturing group. It matches e (or E), an optional sign, and one or more digits.


// Construction
// --NOTE-- I am breaking the DRY principle to help myself remember.
// There are two ways to make a RegExp object. The preferred way, as we say in the examples, is to use a regular expression literal.
// Regular expression literals are enclosed in slashes. This can be a little tricky because slash is also used as the division
// operator and in comments.

// There are three flags that can be set on a RegExp.
// They are indicated by the letters g, i, and m.
// The flags are appended directly to the end of the RegExp literal:

// Make a regular expression object that matches a JavaScript string.
var my_regexp = /"(?:\\.|[^\\\"])*"/g;

// g    --> Global (match multiple times; the precise meaning of this varies with the method)
// i    --> Insensitive (ignore character case)
// m    --> Multiline (^ and $ can match line-ending characters)

// The other way to make a regular expression is to use the RegExp constructor. The constructor takes a string and compiles it into a
// a RegExp object. Some care must be take in building the string because backslashes have a somewhat different meaning in regular
// expressions that in string literals.
// It usually necessary to double the backslashes and escape the quotes:
// Make a regular expression object that matches a JavaScript object.

var my_regexp = new RegExp("\"(?:\\.|[^\\\\\\\"])*\"", "g");
// The second parameter is a string specifying the flags. The RegExp constructor is useful when a regular expression must be
// generated at runtime using material that is not available to the programmer.

// Jumping back to Eloquent JavaScript
// The following example shows a date and time pattern that allows both single and double-digit days, months, and hours.
var dateTime = /^\d{1,2}-\d{1,2}-\d{4}\s\d{1,2}:\d{2}$/;
console.log(dateTime.test("14-3-2015 2:07")); // Returns true
// Let's see how it works
// ^ indicates it is the start of the string.
// \d{1,2} looking for a digit element that must occur at least once and at most two times.
// -\d{1,2} a dash (-) is to be matched literally. We then match a digit that must occur at least once and at most two times.
// -\d{4} a dash is to matched literally. We then match a digit that is required to occur exactly four times.
// \s\d{1,2} the \s is to match whitespace. We then match a digit that must occur at least once and at most two times.
// :\d{2} a colon is to be matched literally. Then match a digit that is required to occur exactly two times.
// $ represents the end of the string. It assures us that there was no extra material after the end of the dateTime string.


// Grouping Subexpressions
// To use an operator like * or + on more than one element at a time, you can use parentheses.
// A part of a regular expression that is enclosed in parentheses counts as a single element as far as the operators following it
// are concerned.
var cartoonCrying = /boo+(hoo+)+/i;
console.log(cartoonCrying.test("Boohoooohoohooo"));     // Returns true
// The first and second + characters apply only to the second o in boo and hoo, respectively.
// The third + applies to the whole group (hoo+), matching one or more sequences like that.

// The i at the end of the expression makes this regular expression case insensitive, allowing it to match the uppercase B in the
// input string, even though the pattern is itself all lowercase.


// Matches and Groups
// The test method is the absolute simplest way to match a regular expression. It tells you only whether it matched and nothing else.
// Regular expressions also have an exec (execute) method that will return null if no match was found and return an object with
// information about the match otherwise.
var match = /\d+/.exec("one two 100");
console.log(match);         // -> ["100"]
console.log(match.index);   // -> 8
// An object returned from exec has an index property that tells us where in the string the successful match begins. Other than that,
// the object looks like (and in fact is) an array of strings, whose first element is the string that was matched -- in the previous
// example, this is the sequence of digits that we were looking for.

// String values have a match method that behaves similarly.
console.log("one two 100".match(/\d+/)); // -> ["100"]

// When a regular expression contains subexpressions grouped with parentheses, the text that matched those groups will also show up
// in the array. The whole match is always the first element. The next element is the part matched by the first group
// (the one whose opening parenthesis comes first in the expression), then the second group, and so on.
var quotedText = /'([^']*)'/;
console.log(quotedText.exec("'hello' moto"));
// -> ["'hello'", "hello", index: 0, input: "'hello' moto"]

// When a group does not end up being matched at all (for example, when followed by a question mark), its position in the output array
// will hold undefined. Similarly, when a group is matched multiple times, only the last match ends up in the array.
console.log(/bad(ly)?/.exec("bad"));
// -> ["bad", undefined, index: 0, input: "bad"]

console.log(/(\d)+/.exec("123"));
// -> ["123", "3", index: 0, input: "123"]

// Brief detour to discuss the preferred way to store date and time values in JavaScript.

// The Date Type
// JavaScript has a standard object type for representing dates -- or rather, points in time.
// It is called Date.
// If you simply create a date object using new, you get the current date and time.
new Date();
// Sat Mar 14 2015 14:43:07 GMT-0500 (CDT) // Pi Day!

// You can also create an object for a specific time.
new Date(1776, 6, 4);
// Thu Jul 04 1776 00:00:00 GMT-0500 (CDT)

// JavaScript uses a convention where month numbers start at zero (so July is 6), yet day numbers start at one. Kind of confusing...
// The last four arguments (hours, minutes, seconds, and milliseconds) are optional and taken to be zero when to given.
// Timestamps are stored as the number of milliseconds since the start of 1970, using negative numbers for times before 1970
// (following a convention set by "Unix Time", which was invented around that time).
// The getTime method on a date object returns this number. It is big, as you can imagine.
new Date(2015, 2, 14).getTime();
// -> 1426309200000

// Date objects provide methods like getFullYear, getMonth, getDate, getHours, getMinutes, and getSeconds to extract their components.
// There is also getYearm which gives us a rather useless two-digit year value (such as 15 or 88).
// Putting parentheses around the parts of the expression that we are interested in, we can now easily create a date object from a
// string.
function findDate(string) {
    var dateTime = /(\d{1,2})-(\d{1,2})-(\d{4})/;
    var match = dateTime.exec(string);
    return new Date(Number(match[3]),
                    Number(match[2]),
                    Number(match[1]));
};
console.log(findDate("4-6-1776"));
// -> Thu Jul 04 1776 00:00:00 GMT-0500 (CDT)


// Word and String Boundaries
// Unfortunately, findDate will also happily extract the nonsensical date 00-1-3000 from the string "100-1-3000".
// A match may happen anywhere in the string, so in this case, it will just start at the second character and end at the
// second-to-last character.

// If we want to enforce that the match must span the whole string, we can add the markers ^ and $.
// The caret, ^ , matches the start of the input string, while the dollar sign, $ , matches the end.
// /^\d+$/ matches a string consisting entirely of one or more digits.
// /^!/ matches any string that starts with an exclamation mark.
// /x^/ does not match any string (there cannot be an x before the start of a string).

// If on the other hand, we just want to make sure the date starts and ends on a word boundary, we can use the marker \b.
// A word boundary can be the start or end of the string or any point in the string that has a word character (as in \w)
// on one side and a non-word character on the other.
console.log(/cat/.test("concatenate"));
// -> true
console.log(/\bcat\b/.test("concatenate"));
// -> false

// --NOTE-- that a boundary marker does not represent an actual character. It just enforces that the regular expression matches only
// when a certain condition holds at the place where it appears in the pattern.


// Choice Patterns
// Say we want to know whether a piece of text contains not only a number but a number followed by one of the words, pig, cow, or
// chicken, or any of their plural forms.

// We could write three regular expressions and test them in turn, but there is a nicer way.
// The pipe character (|) denotes a choice between the pattern to its left and the pattern to its right.
// So we can say this:
var animalCount = /^\b\d+\s(pig|cow|chicken)s?\b$/;
console.log(animalCount.test("15 pigs"));
// -> true
console.log(animalCount.test("15 pigchickens"));
// -> false
console.log(animalCount.exec("15 pigs"));
// -> ["15 pigs", "pig", index: 0, input: "15 pigs"]

// Parentheses can be used to limit the part of the patten the pipe operator applies to, and you can put multiple operators next to
// each other to express a choice between more than two patterns.


// The Replace Method
// String values have a replace method, which can be used to replace part of the string with another string.
console.log("papa".replace("p", "m"));
// -> mapa
// The first argument can also be a regular expression, in which case the first match of the regular expression is replaced.
// When a g option (for global) is added to the regular expression, all matches in the string will be replaced, not just the first.
console.log("Borobudur".replace(/[ou]/, "a"));
// -> Barobudur
console.log("Borobudur".replace(/[ou]/g, "a")); // Added the g flag
// -> Barabadar

// It would have been sensible if the choice between replacing one match or all matches was made through an additional argument to
// replace or by providing a different method, replaceAll. But for some unfortunate reason, the choice relies on a property of the
// regular expression instead.

// The real power of using regular expressions with replace comes from the fact that we can refer back to matched groups in the
// replacement string. For example, say we have a big string containing the names of people, one name per line, in the format
// Lastname, Firstname. If we want to swap these names and remove the comma to get a simple Firstname Lastname format, we can use
// the following code:
console.log("Hopper, Grace\nMcCarthy, John\nRitchie, Dennis\nFranklin, Benjamin".replace(/([\w]+), ([\w]+)/g, "$2 $1"));
// Grace Hopper
// John McCarthy
// Dennis Ritchie
// Benjamin Franklin

// The $1 and $2 in the replacement string refer to the parenthesized groups in the pattern.
// $1 is replaced by the text that matched against the first group.
// $2 by the second, and so on, up to $9.
// The whole match can be referred to with $&.

// Another example:
console.log("Washington, General George\nFranklin, Benjamin American\nJefferson, Thomas Independence\nBush, George Walker".replace(/([\w]+),\s([\w]+)\s([\w]+)/g, "$2 $3 $1"));
// General George Washington
// Benjamin American Franklin
// Thomas Independence Jefferson
// George Walker Bush

// It is also possible to pass a function, rather than a string, as the second argument to replace. For each replacement, the function
// will be called with the matched groups (as well as the whole match) as arguments, and its return value will be inserted into the
// new string.
// Here's a simple example:
var s = "the cia and fbi";
console.log(s.replace(/\b(fbi|cia)\b/g, function(str) {
    return str.toUpperCase();
}));
// -> the CIA and FBI

// Another Example:
var s = "the united states of america";
console.log(s.replace(/\b(the|united|states|america)\b/g, function(str) {
    return str.toUpperCase();
}));
// -> THE UNITED STATES of AMERICA

// Another Example:
var str = "i love the united states of america";

str = str.toLowerCase().replace(/\b([^a-z]|^)([iltusa])/g, function(letter) {
    return letter.toUpperCase();
});
// -> I Love The United States of America

// Another Example:
var str = "i love the united states of america";

tr = str.replace(/([^a-z]|^)([iltusa])/g, function(_, g1, g2) {
    return g1 + g2.toUpperCase();
});
// -> I Love The United States of America


// A more interesting example:
var stock = "1 lemon, 2 cabbages, and 101 eggs";
function minusOne(match, amount, unit) {
    amount = Number(amount) - 1;
    if (amount == 1) {  // only one left, remove the "s"
        unit = unit.slice(0, unit.length - 1);
    } else if (amount == 0) {
        amount = "no";
    }
    return amount + " " + unit;
};
console.log(stock.replace(/(\d+)\s(\w+)/g, minusOne));
// -> no lemon, 1 cabbage, and 100 eggs
// This takes a string, finds all occurrences of a number followed by an alphanumeric word, and returns a string wherein every such
// occurrence is decremented by one.

// The (\d+) group ends up as the amount argument to the function, and the (\w+) group gets bound to unit.
// The function converts amount to a number -- which always works, since it matched \d+ -- and makes some adjustments in case there is
// only one or zero left.



// Greed
// It isn't hard to use replace to write a function that removes all comments from a piece of JavaScript code.
// Here is a first attempt:
function stripComments(code) {
    return code.replace(/\/\/.*|\/\/*[^]*\*\//g, "");
    return code.replace(/\/\/.*|\/\*[^]*?\*\//g, "");

};
console.log(stripComments("1 + /* 2 */3"));
// -> 1 + 3
console.log(stripComments("x = 10; //ten!"));
// -> x = 10;
console.log(stipComments("1 /* a */+/* b */ 1"));
// -> 1 1
console.log(stripComments("Liberty //Freedom"));
// -> Liberty
// The part before the or operator simply watches two slash characters followed by any number of non-newline characters.
// The part for multi-line comments is more involved.
// We use [^] (any character that is not in the empty set of characters) as a way to match any character.
// We cannot just use a dot here because block comments continue on a new line, and dots do not match the newline character.

// But the output of the previous example appears to have gone wrong. Why?

// The [^]* part of the expressions, as described in the section on backtracking, will first match as much as it can. If that causes
// the next part of the pattern to fail, the matcher moves back one character and tries again from there.
// In the example, the matcher first tries to match the whole rest of the string and the moves back from there.
// It will find an occurrence of */ after going back four characters and match that.
// This is NOT what we wanted -- the intention was to match a single comment, not to go all the way to the end of the code and find
// the end of the last block comment.

// Because of this behavior, we say the repetition operators(+,*,?, and {}) are greedy, meaning they match as much as they can and
// backtrack from there.
// If we put a question mark after them (+?, *?, ??, {}?) they become non-greedy and start by matching as little as possible, matching
// more only when the remaining pattern does not fit the smaller match.

// And that is exactly what we want in this case. By having the star match the smallest stretch of characters that brings us to a
// */, we consume one block comment and nothing more.
function stripComments(code) {
  return code.replace(/\/\/.*|\/\*[^]*?\*\//g, "");
}
console.log(stripComments("1 /* a */+/* b */ 1"));
// -> 1 + 1

// --NOTE-- A lot of bugs in regular expression programs can be traced to unintentionally using a greedy operator where a non-greedy
// --NOTE-- one would work better. When using a repetition operator, consider the non-greedy variant first.

function stipComments(code) {
    return code.replace(/\/\/.*|\/\*[^]*?\*\//g, "");
}
console.log(stripComments("1 /* a */+/* b */ 1"));


// Dynamically Creating RegExp Objects
// There are cases where you might not know the exact pattern you need to match against when we are writing code.
// Say we want to look for the user's name in a piece of text and enclose it in underscore characters to make it stand out.
// Since we will know the name only once the program is actually running, we cannot use the slash-based notation.

// But we can build up a string and use the RegExp constructor on that.
// Here is an example:
var name = "hillary";
var text = "Hillary is a suspicious character.";
var regexp = new RegExp("\\b(" + name + ")\\b", "gi");
console.log(text.replace(regexp, "_$1_"));
// -> _Hillary_ is a suspicious character.

// When creating the \b boundary markers, we have to use two backslashes because we are writing them in a normal string, NOT a
// slash-enclosed regular expression.
// The second argument to the RegExp constructor contains the options for the regular expression -- in this case "gi" for global and
// case-insensitive.

// But what if the name is "dea+hl[]rd" because our user is a nerdy teenager?
// That would result in a nonsensical regular expression, which won't actually match the user's name.

// To work around this, we can add backslashes before any character that do not trust.
// Adding backslashes before alphabetic character is a bad idea because things like \b and \n have a special meaning.
// But escaping everything that is not alphanumeric or whitespace is safe.
var name = "dea+hl[]rd";
var text = "This dea+hl[]rd guy is super annoying.";
var escaped = name.replace(/[^\w\s]/g, "\\$&");
var regexp = new RegExp("\\b(" + escaped + ")\\b", "gi");
console.log(text.replace(regexp, "_$1_"));
// -> This _dea+hl[]rd_ guy is super annoying.





