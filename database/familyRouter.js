const express = require('express');
const familyDb = require('./helpers/familyDb.js');
const router = express.Router();

// Gets listing of all families 
router.get('/families', async (req, res) => {
    try {
        const families = await familyDb.get();
        res
            .json(families);
    }
    catch (err) {
        res 
            .status(500)
            .json({ err: "A listing of families cannot be retreived at this time." });
    }
});

// Gets a family by username
router.get('/:username', async (req, res) => {
    try {
        const family = await familyDb.getByUsername(req.params.username);
        if (family) {
            res 
                .json(family);
        }
        else {
            res 
                .status(404)
                .json({ message: "A family with that username does not exist." });
        }
    }
    catch (err) {
        res 
            .status(500)
            .json({ err: "User information cannot be retreived at this time." });
    }
});

// Adds new family to listing
router.post('/register', async (req, res) => {
    const { username } = req.body;
    try {
        if(username) {
            const family = await familyDb.add({ username });
            res 
                .status(201)
                .json({ message: `Welcome to Disney Parent ${family} family!` });
        }
        else {
            res
                .status(404)
                .json({ message: "Please enter a username for your account." });
        }
    }
    catch (err) {
        res
            .status(500)
            .json({ err: "There was an error while saving your family to our database." });
    }

});

// Updates a family listing
router.put('/:username', async (req, res) => {
    const { username } = req.params.username;
    try {
        if (username && contents) {
            const family = await familyDb.update({ username, contents });
            if (family) {
                res
                    .status(200)
                    .json({ message: `${family} family, your account has been updated!` });
            }
            else {
                res
                    .status(404)
                    .json({ message: "The account with specified username does not exist."});
            }
        }
        else {
            res
                .status(400)
                .json({ message: "Please provide username and update for this account." });
        }
    }
    catch (err) {
        res
            .status(500)
            .json({ err: "Your account cannot be modified at this time." });
    }
});

router.delete('/:username', async (req, res) => {
    try {
        const family = await familyDb.remove(req.params.username);
        if(family) {
            res
                .json({ message: `Sorry to see you go ${family} family!` });
        }
        else {
            res
                .status(404)
                .json({ message: 'The family with specified username does not exist.' });
        }
    }
    catch (err) {
        res
            .status(500)
            .json({ err: 'The requested family account cannot be removed at this time.' });
    }
});

// Listing of posts by family
router.get('/:username/post', async (req, res) => {
    try {
        const familyPosts = await familyDb.getFamilyPosts(req.params.username);
        if (familyPosts) {
            res
                .json(familyPosts);
        }
        else {
            res
                .status(400)
                .json({ message: 'No posts from this family.' });
        }
    }
    catch (err) {
        res
            .status(500)
            .json({ err: 'Posts cannot be retreived at this time.' });
    }
});