import fs from 'fs';
// const {calculateSum,x}=require('./sum.js');
// import {calculateSum,x} from './calculate/sum.js';
// import {calculateMultiply} from './calculate/multiply.js';
import {calculateSum,x,calculateMultiply} from './calculate/index.js';

var name="Namaste Nodejs";
var a=10;
var b=20;
console.log("The name is: ",name);
console.log("The sum is: ",a+b);

// Simply global is a container which basically holds all global variables and functions in Nodejs
console.log(global);

console.log(this); // this is not equals to global object which is in case of browser and this refers to module.exports
console.log(globalThis); // this refers to the same global object
console.log(globalThis===global);

// calling the function of calculateSum and calculateMultiply
calculateSum(a,b);
calculateMultiply(a,b);

console.log("The value of x is:",x);

// Read JSON file synchronously
const rawData=fs.readFileSync('./data.json','utf-8');

// JSON.parse converts a json string into a js object 
const data=JSON.parse(rawData);

// JSON.stringify converts a js object back into a json string
console.log(JSON.stringify(data));