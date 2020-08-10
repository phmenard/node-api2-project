const express = require("express");
const posts = require("../data/db.js");

const router = express.Router();

router.post("/api/posts", (req, res) => {
	if (!req.body.title || !req.body.contents) {
		return res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
	}

	posts.insert(req.body)
		.then((posts) => {
			res.status(201).json(posts)
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({ error: "There was an error while saving the post to the database" })
		})
})

router.post("/api/posts/:id/comments", (req, res) => {
	if (!req.body.text) {
		return res.status(404).json({ message: "The post with the specified ID does not exist." })
	}

	posts.insertComment(req.body)
		.then((comment) => {
			res.status(201).json(comment)
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({ error: "The comments information could not be retrieved." })
		})
})

router.put("/api/posts/:id", (req, res) => {
	if (!req.body.title || !req.body.contents) {
		return res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
	}

	posts.update(req.params.id, req.body)
		.then((post) => {
			if (post) {
				res.status(200).json(post)
			} else {
				res.status(404).json({ message: "The post with the specified ID does not exist." })
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({ error: "The post information could not be modified." })
		})
})

router.get("/api/posts", (req, res) => {
    console.log(req.query)
    posts.find(req.query)
        .then((posts) => {
            res.status(200).json(posts)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({ error: "The posts information could not be retrieved." })
        })
})

router.get("/api/posts/:id", (req, res) => {

    posts.findById(req.params.id)
        .then((post) => {
            if (post.length === 0) { throw (404) }
            res.status(200).json(post)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({ error: "The post information could not be retrieved." })
        })

})

router.get("/api/posts/:id/comments", (req, res) => {
	try {
        posts.findPostComments(req.params.id)
		.then((comments) => {
            if (comments.length === 0) { throw (404) }
			res.json(comments)
		})
		.catch((error) => {
			res.status(error).json({ message: "The post with the specified ID does not exist." })
        })
    }catch(e) {
        res.status(500).json({ error: "The comments information could not be retrieved." })
    }
})

router.delete("/api/posts/:id", (req, res) => {
	posts.remove(req.params.id)
		.then((post) => {
			if (post > 0) {
				res.status(200).json({
					message: "The post has been nuked",
				})
			} else {
				res.status(404).json({ message: "The post with the specified ID does not exist." })
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({ error: "The post could not be removed" })
		})
})

module.exports = router;