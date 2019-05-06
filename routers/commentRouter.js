const express = require('express');
const commentDb = require('../database/helpers/commentDb');
const router = express.Router();

// Gets listing of all comments
router.get('/', async(req, res) => {
    try {
        const comments = await commentDb.get();
        res
            .json(comments);
    } catch (err) {
        res
            .status(500)
            .json({ err: "The information requested cannot be retreived." });
    }
});

// Adds new comment to a post
router.post('/', async(req, res) => {
    const {
        post_id,
        username,
        comment
    } = req.body

    if (!post_id || !username || !comment) {
        res
            .status(400)
            .json({ message: "Please provide missing information" });
    }
    try {
        const comments = await commentDb.add(req.body);
        res
            .json(comments);
    } catch (err) {
        res
            .status(500)
            .json({ err: "The post could not be added at this time." });
    }
});

// Deleting a comment
router.delete('/:id', async(req, res) => {
    try {
        const comment = await commentDb.remove(req.params.id);
        if (comment) {
            res
                .json({ message: "Your comment has been successfully removed." });
        } else {
            res
                .status(404)
                .json({ message: "The comment with specified id does not exist." });
        }
    } catch (err) {
        res
            .status(500)
            .json({ message: "The comment could not be removed at this time." });
    }
});

module.exports = router;