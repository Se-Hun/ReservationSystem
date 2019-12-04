const express = require('express');

const QnA = require('../models/qna');

const router = express.Router();

router.get('/', (req, res) => res.json({data:'this is User API.'}));

// input : X
// output : 모든 QnA 데이터
router.get('/getQnA', (req, res) => {
    QnA.getQnA()
    .then(qna => res.send(qna))
    .catch(err => res.status(500).send(err));
})

// 모두 다 가져오는 에러
router.get('/getTitleList', (req, res) => {
    QnA.getTitleList()
    .then(qna => res.send(qna))
    .catch(err => res.status(500).send(err));
})

// input : qna게시물의 id
// input example
/*
{
    "id" : "5de77baf44120913a2a722af",
}
*/
// output : 해당 qna게시물의 내용
router.get('/getContent', (req, res) => {
    QnA.getContents(req.body.id)
    .then(qna => res.send(qna.content))
    .catch(err => res.status(500).send(err));
})

// input : 추가할 qna 데이터
// input example
/*
{
    "title" : "titleTest",
    "content" : "testData"
}
*/
// output : 추가한 qna 데이터
router.post('/newContent', (req, res) => {
    QnA.newContent(req.body)
    .then(qna => res.send(qna))
    .catch(err => res.status(500).send(err));
})

module.exports = router