const express = require('express');
const PostsHubs = require('../data/db.js');

const router = express.Router();

router.get('/', (req, res) => {
    
    PostsHubs.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: err });
        });
});

router.post('/', (req, res) => {
    const request = req.body;

    PostsHubs.insert(request)
        .then(posts => {
            if(request.title && request.contents) {
                res.status(201).json(posts)
            } else res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: "There was an error while saving the post to the database",
            });
        });
});

module.exports = router;
