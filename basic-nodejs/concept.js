// Nodejs is not a programming language, it is a tool that runs javascript outside the browser and it is a javaScript runtime built on Chrome’s V8 engine and V8 js engine is written in C++ language, in simple terms, we can say that V8 engine converts js code into machine level code so the computer can run it
// Nodejs is an event driven architecture- it means that it waits for an event and when an event occurs, it runs a function
// It is also capable of asynchronous I/O or non-blocking I/O
// Wherever there is javascript, there is a js engine
// npm is a tool that helps you install and manage packages for your project
// ES standards means rules and features for the JavaScript language that are officially defined so all browsers and runtimes behave the same
// Node REPL-Read,Evaluate,Print,Loop and it lets you run the js line by line and see the results immediately

// Commonjs modules-
// 1- We use the module.exports and require()
// 2- by default used in Nodejs
// 3- It requires module in synchronous way
// 4- code runs in non-strict mode

// ES Modules-
// 1- we use import and export
// 2- By default used in Reactjs, Angularjs
// 3- It requires module in asynchronous way
// 4- code runs in strict mode

// when we require a module,then all the code of module is wrapped inside the function(IIFE)
// IIFE- Immediately invoked function expression and it keeps the variables and the functions safe and it does not interferer

// steps to require the path-
// 1- Resolving the module
// 2- Loading the module
// 3- Wraps inside the IIFE- this is the compile step
// 4- Code Evaluation
// 5- Caching

// Javascript is a single threaded language and executes one task at a time, if there are so many tasks arrives, then it will placed in a queue and processed one by one by the event loop
// Js is synchronous and single threaded language and with the help of runtime environment like Nodejs, it can performs asynchronous operations