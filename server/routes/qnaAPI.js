const express = require('express');

/* DB models */
const QnA = require('../models/QnA');

const router = express.Router();

/* Implements API Methods */
router.get('/', (req, res) => res.json({data:'this is QnA API.'}));

router.get('/get/list', (req, res) => {
    QnA.get_title_list()
        .then((title_list) => {
            return res.send(title_list)
        })
        .catch(err => res.status(500).send({code: '500', error: 3}))
    // return res.send(QnA.get_title_list())
});

module.exports = router
