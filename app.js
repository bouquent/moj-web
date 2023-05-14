const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser')

const submitRouter = require('./routes/submit')
const userRouter = require('./routes/user')
const dataRouter = require('./routes/data')

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/judge', submitRouter);
app.use('/', userRouter);
app.use('/data', dataRouter)

module.exports = app;
