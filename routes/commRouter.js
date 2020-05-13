const express = require("express")
const db = require("../data/db")

const router = express.Router();

router.post("/:id/comments", async (req, res) => {
    const comment = {
        post_id: req.params.id,
        text: req.body.text
    }
    try {
        if (!req.body.text) {
            return res.status(400).send("Please provide text for the comment.")
        }
        const commentID = await db.insertComment(comment)
        res.status(201).send(commentID)
    } catch {
        res.status(500).send("There was an error while saving the comment to the database")
    }
})

router.get("/:id/comments", async (req, res) => {
    const id= req.params.id
    try {
        const post = await db.findPostComments(id)
        post ? res.status(201).send(post) : res.status(404).send("The post with the specified ID does not exist.")
    } catch {
        res.status(500).send("The comments information could not be retrieved." )
    }
})

module.exports = router;
