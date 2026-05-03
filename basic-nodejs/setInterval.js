// setInterval is a built-in function that repeatedly executes a piece of code at a fixed time interval
const intervalId=setInterval(()=>{
    console.log("It executes after every 2 seconds");
},2000);

// to stop after 10 seconds
setTimeout(()=>{
    clearInterval(intervalId);
    console.log("Stopped after 10 seconds");
},10000);