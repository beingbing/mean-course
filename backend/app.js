const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect('mongodb+srv://superAdmin:9eJYItfmerC8DAC0@cluster0-ot5j9.mongodb.net/node-angular?retryWrites=true').then(() => { // /test was name of database, so we changed it
    console.log('Connected to database !');
})
.catch(() => {
    console.log('Connection failed !')
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
    next();
});

app.post('/api/posts', (req, res, next) => {
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

app.get('/api/posts', (req, res, next) => {
    Post.find().then(documents => {
        console.log('documents', documents);
        res.status(200).json({
            message: 'posts fetch successfully',
            posts: documents
        });
    });
});

app.delete('/api/posts/:id', (req, res, next) => {
    console.log(req.params.id);
    Post.deleteOne({_id: req.params.id}).then(result => {
        console.log('=======================result', result);
    });
    res.status(200).json({message: 'Post Deleted from app.js'});
});

module.exports = app;