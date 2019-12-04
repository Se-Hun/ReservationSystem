const express = require('express');
const Reservation = require('../models/reservation');
const router = express.Router();

// input: 아래 예시와 같은 형식의 데이터 
/*
{
    "departure": "daejeon",
    "arrival": "seoul",
    "date": "2019-12-11",
    "time": "09:00",
    "peoplenum": "1",
    "age": "children",
    "way": "oneway",
    "card": "Kakao_bank",
    "cardnum": "3333-33-3333",
    "state": "0"
}
*/
// output : _ID
// todo : 반환되는 reservation id를 유저 데이터에다가도 추가해줘야함
router.post('/reserve', (req, res) => {
    Reservation.reserve(req.body)
    .then(reservation => res.send(reservation._id))
    .catch(err => res.status(500).send(err));
})

// input : 해당 예매 정보에 대한 id
// output :  _ID
router.post('/deleteReservation', (req, res) => {
    Reservation.deleteReservation(req.body.id)
    .then(reservation => res.send(reservation._id))
    .catch(err => res.status(500).send(err));
})

// input : 해당 예매 정보에 대한 id
// output : _ID
router.post('/editReservation', (req, res) => {
    Reservation.editReservation(req.body.id, req.body.departure, req.body.arrival, req.body.date, req.body.time, req.body.peoplenum, req.body.age, req.body.way, req.body.card, req.body.cardnum, req.body.state)
    .then(reservation => res.send(reservation._id))
    .catch(err => res.status(500).send(err));
})

module.exports = router