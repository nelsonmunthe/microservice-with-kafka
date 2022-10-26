const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const helmet = require('helmet');

const orderRoute = require('./routes/orderRoutes')

app.use(
    express.json({
        limit: '3mb',
    })
);

app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(helmet());

app.use('/order', orderRoute)

module.exports = app;