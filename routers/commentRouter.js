const express = require('express');
const commentDb = require('../database/helpers/commentDb');
const router = express.Router();

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

module.exports = router;