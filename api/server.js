const express = require('express');
const helmet = require('helmet');

const familyRouter = require('../database/familyRouter.js');
const server = express();

server.use(express.json(), helmet());
server.use('/families', familyRouter);

server.get('/', (req, res) => {
    res.send("operational");
});

module.exports = server;