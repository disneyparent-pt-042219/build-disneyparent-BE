const express = require('express');

const configMiddleware = require('./middleware.js');
const authRouter = require('../auth/authRouter.js');
const familyRouter = require('../routers/familyRouter');
const postsRouter = require('../routers/postsRouter');
const commentRouter = require('../routers/commentRouter');

const server = express();

configMiddleware(server);

server.use('/', authRouter);
server.use('/families', familyRouter);
server.use('/posts', postsRouter);
server.use('/comments', commentRouter);


server.get('/', (req, res) => {
    res.send("operational");
});

module.exports = server;