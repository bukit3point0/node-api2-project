// implement your posts router here
const router = require('express').Router()

const Posts = require('./posts-model')

// [GET] /api/posts
router.get('/', (req,res) => {
    Posts.find()
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: `error retrieving posts`
        })
    })
})
// [GET] /api/posts/:id
router.get('/:id', (req,res) => {
    Posts.findById(req.params.id)
    .then(foundPost => {
        if (!foundPost) {
            res.status(404).json({
                message: `post does not exist`
            })
        } else {
            res.json(foundPost)
        }
    })
    .catch(err => {
        res.status(500).json({
            error: `post not found`,
            message: err.message,
            stack: err.stack
        })
    })
})
// [POST] /api/posts
router.post('/', (req,res) => {
    const newPost = req.body
    Posts.insert(newPost)
    .then((addPost) => {
        if(!addPost.title || !addPost.contents) {
            res.status(400).json({
                message: `provide title and contents`
            })
        } else {
            const createPost = (addPost)
            res.status(201).json(createPost)
        }
    })
    .catch(err => {
        res.status(500).json({
            error: `post not found`,
            message: err.message,
            stack: err.stack
        })
    })
})
// [PUT] /api/posts/:id
router.put('/:id', (req,res) => {
    const {id} = req.params
    Posts.update(id, req.body)
    .then(editedPost => {
        if(!editedPost) {
            res.status(404).json({
                message: `does not exist`
            })
        } else {
            res.json(editedPost)
        }
    })
    .catch(err => {
        res.status(500).json({
            error: `posts not found`
        })
    })
})
// [DELETE] /api/posts/:id
router.delete('/:id', (req,res) => {
    Posts.remove(req.params.id)
    .then(removePost => {
        if (!removePost) {
            res.status(404).json({
                message: `does not exist`
            })
        } else {
            res.json(removePost)
        }
    })
    .catch(err => {
        res.status(500).json({
            error: `post not found`,
            message: err.message,
            stack: err.stack
        })
    })
})
// [GET] /api/posts/:id/comments
router.get('/:id/comments', (req,res) => {
    Posts.findPostComments(req.params.id)
    .then(posts => {
        if (posts.length > 0) {
            res.status(200).json(posts)
        } else {
            res.status(404).json({
                message: `does not exist`
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            error: `post not found`,
            message: err.message,
            stack: err.stack
        })
    })
})

module.exports = router