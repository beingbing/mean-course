const mongoose = require('mongoose');

// first create a blueprint as how your data should look like

const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true }
});

// Schema is just a blueprint, nothing else
// now, after schema defined, mongoose need a model to work in with

module.exports = mongoose.model('Post', postSchema);