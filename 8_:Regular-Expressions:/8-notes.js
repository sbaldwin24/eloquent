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

// A regular expression consisting of only nonspecial characters simply represents that sequence of characters. If "abc" occurs
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
// "\W" --> A nonalphanumeric character
// "\S" --> A nonwhitespace character
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
// The star (*) has a similiar meaning but also allows the pattern to match zero times. Something with a start after it never prevents
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
var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
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
    document.writeln(names[i] + ":" + blanks.substring(names[i].length), result[i]);
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
