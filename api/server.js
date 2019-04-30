const express = require('express');

const configMiddleware = require('./middleware.js');
const authRouter = require('../auth/authRouter.js');
const familyRouter = require('../database/familyRouter.js');
const postsRouter = require('../database/postsRouter.js');

const server = express();

configMiddleware(server);

server.use('/auth', authRouter);
server.use('/families', familyRouter);
server.use('/posts', postsRouter);

server.get('/', (req, res) => {
    res.send("operational");
});

module.exports = server;