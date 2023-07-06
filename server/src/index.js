require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT ?? 5000;

app.get('/', (req, res) => {
    res.status(200).send('Hello from server')
});

app.listen(port, (err) => {
    err ? console.log(err) : 'Server is listening on port '+port;
});