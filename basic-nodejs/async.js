// imports Nodejs file system module
import fs from 'fs';
import https from 'https';

console.log("Hello World");
var a=1078698;
var b=20986;

// it basically fetches the data from an api
// https.get("https://dummyjson.com/products/1",(res)=>{
//   console.log("Fetched Data Successfully");
// });

setTimeout(()=>{
    console.log('set Timeout called after 5 seconds');
},5000);

// reads file in asynchronous way
fs.readFile('./file.txt','utf-8',(err,data)=>{
    console.log("File data: ",data);
});

function multiplyFn(x,y){
    const result=a*b;
    return result;
}

var c=multiplyFn(a,b);
console.log("The result is:",c);