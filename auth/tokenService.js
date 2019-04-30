const jwt = require('jsonwebtoken');

const secrets = require('../config/secrets.js');

module.exports = {
    generateToken,
};

function generateToken(family) {
    const payload = {
        subject: family.id,
        username: family.username,
        roles: ['Family']
    };

    const options = {
        expiresIn: '1d',
    };

    return jwt.sign(payload, secrets.jwtSecret, options);
}