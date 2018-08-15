const express = require('express');

const Post = require('../models/post');

const router = express.Router();

router.post('', (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    console.log('post', post);
    post.save().then(result => {
        console.log('result', result);
        res.status(201).json({
            message: 'Post added successfully',
            postId: result._id
        });
    });
});

router.get('', (req, res, next) => {
    Post.find().then(documents => {
        console.log('documents', documents);
        res.status(200).json({
            message: 'posts fetch successfully',
            posts: documents
        });
    });
});

router.delete('/:id', (req, res, next) => {
    console.log(req.params.id);
    Post.deleteOne({_id: req.params.id}).then(result => {
        console.log('=======================result', result);
    });
    res.status(200).json({message: 'Post Deleted from router.js'});
});

router.put('/:id', (req, res, next) => {
    console.log('req router.js', req);
    const post = new Post({
        _id: req.body.id,
        title: req.body.title, 
        content: req.body.content
    })
    Post.updateOne({_id: req.params.id}, post).then(result => {
        console.log('result'. result);
        res.status(200).json({ message: "Update successfull! "})
    })
});

router.get('/:id', (req, res, next) => {
    console.log('I ran');
    Post.findById(req.params.id).then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'Post not found!'});
        }
    })
});

module.exports = router;