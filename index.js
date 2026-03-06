var name="Namaste Nodejs";
var a=10;
var b=20;
console.log("The name is: ",name);
console.log("The sum is: ",a+b);

// Simply global is a container which basically holds all global variables and functions in Node.js
console.log(global);

console.log(this); // this is not equals to global object which is in case of browser and this refers to module.exports
console.log(globalThis); // this refers to the same global object
console.log(globalThis===global);