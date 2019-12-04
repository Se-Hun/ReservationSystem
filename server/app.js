const express = require('express');
const bodyParser = require('body-parser')
const logger = require('morgan')
// const session = require('express-session')

// For distribution Port
const API_PORT = 5000;

// Init Express Server App
const app = express();
const api = require('./routes/index');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(logger('dev')); // logging

app.use('/api', api);

app.get('/test', (req, res) => {
    return res.send('Hello World');
})


const port = process.env.PORT || API_PORT;
app.listen(port, () => console.log(`Listening on port ${port}...`));