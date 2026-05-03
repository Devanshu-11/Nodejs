import crypto from "crypto";
console.log("Hello World");

var a=1078698;
var b=20986;

// In case of Sync and it is not prefer to use this method
crypto.pbkdf2Sync("password","salt",340,12,"sha512");
console.log("Sync Key is generated");

// Password Based Key derivative function and it is async function managed by Libuv and if we want to block the main thread,we can use sync function which is pbkdf2Sync and sync function will never have a callback function
crypto.pbkdf2(
    "password", // password
    "salt", // salt- It is just a random piece of data added to a password before hashing
    340, // iterations
    50, // Key length in bytes
    "sha512", // Digest Algorithm
(err,key)=>{
    console.log("Async Key is generated");
});

function multiplyFn(x,y){
    const result=a*b;
    return result;
}

var c=multiplyFn(a,b);
console.log("The result is:",c);