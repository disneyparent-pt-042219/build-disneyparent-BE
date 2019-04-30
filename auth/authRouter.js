const router = require('express').Router();
const bcrypt = require('bcryptjs');

const tokenService = require('./tokenService.js');
const family = require('../database/helpers/familyDb.js');

// Adds new family to listing
router.post('/register', (req, res) => {
    let { username, password } = req.body;
    const hash = bcrypt.hashSync(family.password, 10);
    family.password = hash;

    family.add({ username, password })
        .then(saved => {
            res
                .status(201)
                .json({ message: 'Welcome to Disney Parent!' });
        })
        .catch(error => {
            res
                .status(500)
                .json({ message: 'Your family account could not be added at this time.' });
        });
});

// Logs into current family account
router.post('/login', (req, res) => {
    let { username, password } = req.body;

    family.getByUsername({ username })
        .first()
        .then(family => {
            if (family && bcrypt.compareSync(password, family.password)) {
                const token = tokenService.generateToken(family);
                res
                    .status(200)
                    .json({
                        message: `Welcome ${family.username}!`,
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