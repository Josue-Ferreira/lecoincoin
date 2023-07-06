require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT ?? 5000;
const userRouter = require('./router/user');

app.use('/user', userRouter);

app.listen(port, (err) => {
    err ? console.log(err) : 'Server is listening on port '+port;
});