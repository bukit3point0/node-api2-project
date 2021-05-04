// implement your server here
// require your posts router and connect it here
const express = require('express')
const server = express()
server.use(express.json())

const postRouter = require('./posts/posts-router')
server.use('/api/posts', postRouter)

server.use('*', (req,res) => {
    res.status(404).send(`
        <h2>No endpoint here</h2>
    `)
})

module.exports = server