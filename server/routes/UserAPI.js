const express = require('express');

/* DB models */
const User = require('../models/User');

const router = express.Router();


/* Implements API Methods */
router.get('/', (req, res) => res.json({data:'this is User API.'}));

// 안 되겠다.. DAO 클래스를 index.js에서 정의하는걸로 하자.
router.post('/login', (req, res) => {
    // console.log(req.body)
    User.login(req.body.account)
        .then((user) => {
            if(!user) {
                return res.send({err: 'Not Found User'})
                // return res.status(404).send({err: 'Not Found User'})
            }
            else {
                console.log(user)
            }
        })
        .catch(err => res.status(500).send(err))
})

router.post('/user/register', (req, res) => {

})

router.post('/user/modify', (req, res) => {

})

router.post('/user/bookmarks', (req, res) => {

})

module.exports = router