// toString Method
// You can create a function to be called in place of the default toString() method. The toString() method takes no arguments and should
// return a string. The toString() method you create can be any value you want, but it will be most useful if it carries information about
// the object.

// The following code defines the Dog object type and creates theDog, an object of type Dog:
function Dog(name, breed, color, sex) {
    this.name = name;
    this.breed = breed;
    this.color = color;
    this.sex = sex;
}

theDog = new Dog("Eddie", "Jack Russel Terrier", "White and Orange", "Male");

// If we call the toString() method on this custom object, it returns the default value inherited from Object:
theDog.toString(); // returns [object Object]

// The following code creates and assigns dogToString() to override the default toString() method. This function generates a string
// containing the name, breed, color, and sex of the object, in the form "property = value;".

Dog.prototype.toString = function dogToString() {
    var ret = "Dog " + this.name + " is a " + this.sex + " " + this.color + " " + this.breed;
    return ret;
}
// With the preceding code in place, any time theDog is used in a string context, JavaScript automatically calls the dogToString()
// function, which returns the following string:
Dog Eddie is a Male White and Orange Jack Russel Terrier

