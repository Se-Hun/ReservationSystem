const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

// Connection with MongoDB
const dbRoute = 'mongodb://106.10.38.76:22:5570/ReservSystem';
mongoose.connect(dbRoute, {useNewUrlParser: true});
let db = mongoose.connection;
db.once('open', () => console.log('connected to the database'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

router.get('/', (req, res) => res.json({data:'this is index.'}));



module.exports = router