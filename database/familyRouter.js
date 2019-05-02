const express = require('express');
const router = express.Router();

const familyDb = require('./helpers/familyDb.js');
const postDb = require('./helpers/postDb.js');

const restricted = require('../auth/restricted');
const auth = require('../auth/checkAuth');


// Gets listing of all families 
router.get('/', async(req, res) => {
    try {
        const families = await familyDb.get();
        res
            .json(families.username);
    } 
    catch (err) {
        res
            .status(500)
            .json({ err: "A listing of families cannot be retreived at this time." });
    }
});

// Gets a family by username
router.get('/:id', async(req, res) => {
    familyDb
        .getById(req.params.id)
        .then(user => {
            if (user) {
                res
                    .json(user);
            }
            else {
                res
                    .status(404)
                    .json({ message: "A family with that username does not exist." });
            }  
        })
        .catch (err => 
            res
                .status(500)
                .json({ err: "User information cannot be retreived at this time.", err })
        );
});

// Updates a family account
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const updatedFamily = req.body;

    familyDb
        .update(id, updatedFamily)
        .then(family => {
            if(family) {
                res
                    .json({ message: "Your account has been updated!" });
            }
            else {
                res
                    .status(404)
                    .json({ message: "Family with specified id not found." });
            }
        })
        .catch (err => 
            res
                .status(500)
                .json({ message: "Account update failed." })
        );
});


// Deletes a family account
router.delete('/:id', async (req, res) => {
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
router.get('/:username/post', async(req, res) => {
    try {
        const familyPosts = await familyDb.getFamilyPosts(req.params.username);
        if (familyPosts) {
            res
                .json(familyPosts);
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