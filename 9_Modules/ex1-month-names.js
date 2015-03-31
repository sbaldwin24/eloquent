// Writing a module that converts month numbers to names and convert name back to numbers.

var month = function() {
  var names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return {
    name: function(number) {
      return names[number];
    },
    number: function(name) {
      return names.indexOf(name);
    }
  };
}();

console.log(month.name(3));
// -> April
console.log(month.number("April"));
// -> 3


// Another example
var president = function() {
  var presidents = ["George Washington", "John Adams", "Thomas Jefferson", "James Madison", "James Monroe", "John Quincy Adams", "Andrew Jackson"];

  return {
    name: function(number) {
      return presidents[number];
    },
    number: function(name) {
      return presidents.indexOf(name);
    }
  };
}();
president.name(0);
// -> "George Washington"
president.number("George Washington");
// 0
