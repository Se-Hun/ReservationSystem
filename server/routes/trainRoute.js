const express = require('express');
const TrainRoute = require('../models/trainRoute');
const router = express.Router();

router.get('/', (req, res) => res.json({data:'this is index.'}));
// input : X
// output : 모든 공지사항 데이터
router.post('/addRoute', (req, res) => {
    TrainRoute.addRoute(req.body)
    .then(trainRoute => res.send(trainRoute))
    .catch(err => res.status(500).send(err));
});

// input : 출발지, 도착지, 날짜, 시간
// input example
/*
{
    "id" : "5de77baf44120913a2a722af",
}
*/
// output : 해당하는 기차의 노선 정보
router.get('/searchPath', (req, res) => {
    TrainRoute.searchPath(req.body.departure, req.body.arrival, req.body.date, req.body.time)
    .then(trainRoute => res.send(trainRoute))
    .catch(err => res.status(500).send(err));
});

module.exports = router