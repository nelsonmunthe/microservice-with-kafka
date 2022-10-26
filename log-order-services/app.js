const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const KafkaNode = require('./modules/share/entities/KafkaNode')

app.use(
    express.json({
        limit: '3mb',
    })
);

app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(helmet());

new KafkaNode().subscribe();

module.exports = app;