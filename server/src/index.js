require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT ?? 5000;
const userRouter = require('./router/user');
const productRouter = require('./router/product');

app.use(express.json());

app.use('/user', userRouter);
app.use('/product', productRouter);

app.listen(port, (err) => {
    err ? console.log(err) : console.log('Server is listening on port '+port);
});