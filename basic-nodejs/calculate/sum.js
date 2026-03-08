// Modules protect their variable and functions from leaking
export var x="Hello World";

// if we use non-strict mode, it will not throws error but we are using strict mode,it will throw error
// z="Hello World";
export function calculateSum(a,b){
    const sum=a+b;
    console.log("The sum is:",sum);
}

// module.exports={calculateSum,x};