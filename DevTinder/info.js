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

// Auth Router-
// 1- POST /signup
// 2- POST /login
// 3- POST /logout

// profile Router-
// 1- GET /profile/view
// 2- PATCH /profile/edit
// 3- PATCH /profile/password

// connectionRequest Router-
// 1- POST /request/send/interested/:userId 
// 2- POST /request/send/ignored/:userId
// 3- POST /request/review/accepted/:requestId
// 4- POST /request/review/rejected/:requestId

// getUser Router-
// 1- GET /user/connections 
// 2- GET /user/requests/received
// 3- GET /user/feed -it gets you the profile of other users on the platform