const router = require('express').Router();
const bcrypt = require('bcryptjs');
const db = require('../database/dbConfig');

const restricted = require('./restricted');
const tokenService = require('./tokenService.js');
const family = require('../database/helpers/familyDb');


// Adds new family to listing
router.post('/register', async(req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
    console.log(user);

    try {
        const fam = await db('family').insert(req.body);
        if (fam) {
            const token = tokenService.generateToken(fam);
            res
                .status(200)
                .json({
                    message: 'Welcome to Disney Parent!',
                    token
                });
        } else {
            res
                .status(404)
                .json(err);
        }
    } catch (err) {
        res
            .status(500)
            .json(err);
    }
});

// Logs into current family account
router.post('/login', restricted, (req, res) => {
    let { username, password } = req.body;

    family
        .getBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = tokenService.generateToken(user);
                res
                    .status(200)
                    .json({
                        message: `Welcome back ${user.username}!`,
                        token,
                        roles: token.roles,
                    });
            } else {
                res
                    .status(401)
                    .json({ message: "Invalid credentials." });
            }
        })
        .catch(error => {
            res
                .status(500)
                .json({ message: "Account cannot be logged in at this time." });
        });
});

module.exports = router;