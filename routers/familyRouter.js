const express = require('express');
const router = express.Router();

const familyDb = require('../database/helpers/familyDb');
const postDb = require('../database/helpers/postDb');

const db = require("../database/dbConfig")
const restricted = require('../auth/restricted');
const auth = require('../auth/checkAuth');


// Gets listing of all families 
router.get('/', restricted, auth('Family'), async(req, res) => {
    try {
        const families = await familyDb.get();
        if (families) {
            res
                .json(families);
        }
    } catch (err) {
        res
            .status(500)
            .json({ err: "A listing of families cannot be retreived at this time." });
    }
});


// Deletes a family account
router.delete('/:id', restricted, auth('Family'), async(req, res) => {
    let user = req.body;

    try {
        const family = await familyDb.remove(req.params.id);
        if (family) {
            res
                .json({ message: `Sorry to see you go ${user.username} family!` });
        } else {
            res
                .status(404)
                .json({ message: 'The family with specified username does not exist.' });
        }
    } catch (err) {
        res
            .status(500)
            .json({ err: 'The requested family account cannot be removed at this time.' });
    }
});

// Listing of posts by family
router.get('/:id', restricted, auth('Family'), async(req, res) => {
    res
    try {
        const family = await familyDb.getById(req.params.id);

        if (family) {
            const post = await postDb.getPostByFamily(req.params.id)
            if (post) {
                res
                    .json(post);
            }

        } else {
            res
                .status(400)
                .json({ message: 'No posts from this family.' });
        }
    } catch (err) {
        res
            .status(500)
            .json({ err: 'Posts cannot be retreived at this time.' });
    }
});

module.exports = router;