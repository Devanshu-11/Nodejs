console.log("Hello World");

var a=1078698;
var b=20986;

// This callback function will only be pushed to call stack in v8 once the call stack is empty
setTimeout(()=>{
    console.log("setTimeout is called immediately");
},0);

function multiplyFn(x,y){
    const result=a*b;
    return result;
}

var c=multiplyFn(a,b);
console.log("The result is:",c);