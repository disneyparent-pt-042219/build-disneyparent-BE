const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const familyRouter = require('../database/familyRouter.js');
const postsRouter = require('../database/postsRouter.js');

const server = express();

server.use(express.json(), helmet());
server.use(cors());

server.use('/families', familyRouter);
server.use('/posts', postsRouter);

server.get('/', (req, res) => {
    res.send("operational");
});

module.exports = server;