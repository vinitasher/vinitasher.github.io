Javascript Functions

Function invocation patters

Method invocation pattern
function invoked is a property of an object. It can modify the object using this. Binding happens very late during method invocation.

Function invocation pattern
function invoked is not a property of an object invoked directly. Bound to global scope. Ideally function should have been bound to the outer function scope.

Constructor invocation pattern
invoked with a new keyword. 

Apply invocation pattern .apply(this, arguments)

Add a method to an existing type conditionally only when method does not already exist
Function.prototype.method = function(name, func){
	if(!this[name]){
		this[name] = func;
		return this;
	}
}

Javascript does not have C style block scope. Javascript has function scope. That means variables defined within a function are not visible outside the function. Also a variable defined anywhere within a function is available everywhere within a function

Javascript modules
takes advantage of function scope and closure to create relationships that are binding and private
function that defines private variables and functions which through closure have access to private variables and returns the privileged functions
use of modules eliminates the use of global variables, promotes information hiding and other good design practices

String.method('deentify', function(){
	
	var entity = {
		quot: '"',
		lt: '<',
		gt: '>'
	};

	return function(){
		return this.replace(*regular expression*, function(a,b){
			var r = entity[b];
		});
	}

}()); //notice here we immediately invoke the function here. This creates and returns the function which creates the deentitify method.

Cascade
Functions returning the this object instead of returning nothing(which would return undefined)
getElement('myDiv').move(150).width(240) blah blah balh


Memoization
Functions can use objects to remember results of previous operations

var fibonacci = (function(){
	var memo = [0, 1];

	var fib = function(n){
		var result = memo[n];
		if(typeof result !== 'integer'){
			result = fib(n-1) + fib(n-2);
			memo[n] = result;
		}
		return result;
	}

	return fib;
}()); //creates a module;

Create a generic memoizer library

var memoizer = function(memo, formula){
	var recur = function(n){
		var result = memo[n];
		if(typeof result !== 'number'){
			result = formula(recur, n);
			memo[n] = result;
		}
		return result;
	}
	return recur;
};

//fibonacci using memoizer
var fibonacci = memorizer([0,1], function(recur, n){
	return recur(n-1) + recur(n-2);
});

//factorial using memoizer
var factorial = memoizer([1,1], function(recur, n){
	return recur(n-1) * recur(n-2);
})

Inheritance

Psuedoclassical inheritance
Cat.prototype = new Mammal();

Prototypal Inheritance
A new object can inherit properties from an old object. 
var myCat = Object.create(myMammal);
This is differential inheritance. Customize a new object by only specifying differences from the old object

Functional Inheritance
- Creates a new object
- defines private variables and methods
- Auguments the new object with methods. these methods have privileged access to vars and parameters
- returns the new object

var mammal = function(spec){ // spec = parameter
	var that = {}; //new object
	that.get_name = function() { // add function
		return spec.name;
	}
	return that;
}

var myMammal = mammal({name: 'Horse'});

var cat = function(spec){
	spec.saying = spec.saying || 'meow'; //default value for parameter
	var that = mammal(spec);
	that.purr = function(n){
		//return rrrr n times
	}
	that.get_name = function(){
		//overload get name
	}
	return that;
}

call super method using functional inheritnce

Object.method('superior', function(name){
	var that = this, 
		method = that[name];

	return function(){
		return method.apply(that, arguments);
	};
});

var coolcat = function(spec){
	var that = cat(spec);
	var super_get_name = that.superior('get_name');
	that.get_name = function(){
		return 'cool '+super_get_name()+' cool';
	};
};
var mycoolcat = coolcat({name: 'vinit'});
mycoolcat.get_name(); // cool vinit cool
