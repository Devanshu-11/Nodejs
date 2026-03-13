// Product Requirements-
// 1- Create account
// 2- Login 
// 3- Update your profile 
// 4- Feed Page- giving you data of other users 
// 5- Send connection request 
// 6- See our matches
// 7- see request we have send 

// Tech Planning-
// 1- Frontend
// 2- Backend

// Database design- We should remember about the single responsibility principle
// 1- User Collection-first Name, last name, email id, password, age, gender 
// 2- Connection Request-from userId, to userId, status and status can be pending, accepted or rejected, ignored etc

// REST API- It is an interface that allows different applications to communicate with each other over the internet using HTTP methods such as GET,POST,PUT and DELETE methods
// GET- to get data from database
// POST- put some data in database
// PUT- it is used to update the data and do full update and it basically replaces everything
// DELETE- it is used to delete the data
// PATCH-update specific fields and do partial update

// API
// 1- POST- signup 
// 2- POST- login 
// 3- GET- to get profile 
// 4- POST- update profile 
// 5- DELETE- delete profile 
// 6- POST- send connection request- ignore or interested
// 7- POST- review request- accept or reject
// 8- GET- see all the requests 
// 9- GET- to get all the connections