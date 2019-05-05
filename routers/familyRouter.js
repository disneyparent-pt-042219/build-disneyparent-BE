const express = require('express');
const router = express.Router();

const familyDb = require('../database/helpers/familyDb');
const postDb = require('../database/helpers/postDb');

const restricted = require('../auth/restricted');
const auth = require('../auth/checkAuth');


// Gets listing of all families 
router.get('/', async(req, res) => {
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

// Gets a family by username
/*router.get('/:id', async(req, res) => {
    familyDb
        .getById(req.params.id)
        .then(user => {
            if (user) {
                res
                    .json(user);
            } else {
                res
                    .status(404)
                    .json({ message: "A family with that username does not exist." });
            }
        })
        .catch(err =>
            res
            .status(500)
            .json({ err: "User information cannot be retreived at this time.", err })
        );
});*/


// Deletes a family account
router.delete('/:id', async(req, res) => {
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
router.get('/:id', async(req, res) => {
    let user = req.body
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