const express = require('express');

const app = express();

app.use('/api/posts', (req, res, next) => {
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