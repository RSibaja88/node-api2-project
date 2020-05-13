const express = require("express")
const db = require("../data/db")

const router = express.Router();

router.post("/", (req, res) => {
    const {title, contents} = req.body;
    if(!title || !contents) {
        res.status(400).send("Please provide title and contents for post.")
    } else {
        db.insert(req.body)
        .then(post => {
            res.status(201).send(post);
        })
        .catch(error => {
            console.log(error);
            res.status(500).send("There was an error while saving your changes to db")
        })
    }
})

router.get("/", (req, res) => {
    db.find(req.body)
    .then(posts => {
        res.status(200).send(posts)
    })
    .catch(error => {
        console.log(error);
        res
            .status(500)
            .send("The posts info couldnt be retrieved.")
    })
})

router.get("/:id", async (req, res) => {
    const id = req.params.id
    try {
        const post = await db.findById(id);
        post ? res.status(201).send(post) : res.status(404).send("The post with the specified ID does not exist.")
    } catch {
        res.status(500).send( "The post information could not be retrieved.")
    }
})

router.delete("/:id", (req, res) => {
    const id = req.params.id
    db.remove(id)
    .then(post => {
        if (post) {
            res.status(200).send("Post has been deleted.")
        } else {
            res
                .status(404)
                .send("The post with the specified ID does not exist.")
        }
    })
    .catch(error => {
        console.log(error);
        res
            .status(500)
            .send("The post couldnt be recovered.")
    })
})

router.put('/:id', async (req, res) => {
    try {
        const post = await db.update(req.params.id, req.body)
        post === 1 ? res.status(201).json(post) : res.status(404).json("The post with the specified ID does not exist.")
    } catch {
        res.status(500).json("The post information could not be modified.")
    }
})

module.exports = router;