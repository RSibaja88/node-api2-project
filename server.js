const express = require('express');
const postsRouter = require("./routes/postsRouter")
const commRouter = require("./routes/commRouter")
const server = express();

server.use(express.json())

server.use("/api/posts", postsRouter)
server.use("/api/posts", commRouter)

module.exports = server;