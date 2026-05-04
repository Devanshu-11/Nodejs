import fs from 'fs';
const a=100;

setImmediate(()=>{
    console.log("set Immediate function is called");
});

fs.readFile('./file.txt','utf-8',()=>{
    console.log("Reading of File has been completed");
});

setTimeout(()=>{
    console.log("setTimeout function is called");
},0);

function printA(){
    console.log("The value of a is: ",a);
}
printA();
console.log("Last Line of File will be completed");