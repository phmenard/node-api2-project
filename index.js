const express = require("express")
const users = require("./users/users-model")
const usersRouter = require("./users/users-router");
const welcomeRouter = require("./wlecome/welcome-router");

const server = express()
const port = 4000


// start the server
server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})