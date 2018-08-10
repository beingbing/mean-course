const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
    next();
});

app.post('/api/posts', (req, res, next) => {
    const post = req.body;
    console.log('post', post);

    res.status(201).json({
        message: 'Post added successfully'
    });
});

app.get('/api/posts', (req, res, next) => {
    const posts = [
        {id: '12345', title: 'my first posts', content: 'this is the content of my first post'},
        {id: 'sdtre',title: 'my second posts', content: 'this is the content of my second post'},
        {id: 'uytrf',title: 'my third posts', content: 'this is the content of my third post'}
    ];

    res.status(200).json({
        message: 'posts fetch successfully',
        posts: posts
    });
});

module.exports = app;