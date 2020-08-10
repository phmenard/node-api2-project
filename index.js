const express = require("express")
const postRouter = require("./posts/posts-router");

const server = express()
const port = 4000

server.use(express.json())
server.use(postRouter);

// start the server
server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})