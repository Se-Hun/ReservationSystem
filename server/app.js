const express = require('express');
const bodyParser = require('body-parser')
const logger = require('morgan')
const mongoose = require('mongoose');

// For distribution Port
const API_PORT = 5000;

// Init Express Server App
const app = express();
const api = require('./routes/index');
const userAPI = require('./routes/UserAPI');

// Connection with MongoDB
const dbRoute = 'mongodb://106.10.38.76:22:5570/ReservSystem';
mongoose.connect(dbRoute, {useNewUrlParser: true});
let db = mongoose.connection;
db.once('open', () => console.log('connected to the database'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Server App Configure
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(logger('dev')); // logging

// Server App Routing
app.use('/api', api);
app.use('/api/user', userAPI);


// Server App method
app.get('/test', (req, res) => {
    return res.send('Hello World');
})

// Server Socket Listening
const port = process.env.PORT || API_PORT;
app.listen(port, () => console.log(`Listening on port ${port}...`));