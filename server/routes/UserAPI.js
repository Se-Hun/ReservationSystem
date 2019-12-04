const express = require('express');

/* DB models */
const User = require('../models/User');

const router = express.Router();


/* Implements API Methods */
router.get('/', (req, res) => res.json({data:'this is User API.'}));

// 안 되겠다.. DAO 클래스를 UserAPI.js에서 정의하는걸로 하자.
router.post('/login', (req, res) => {
    // Error Code
    // 1 : front-end에서 account를 보내지 않았을때
    // 2 : 아이디가 없거나 비밀번호가 틀렸을때
    // 3 : 500 에러 => Back-End나 DB 문제

    const account = req.body.account
    const password = req.body.password

    if(!account) {
        // Code 1: Front-End에서 정확한 Format으로 보내지 않았을 때 : Id를 보내지 않음
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "account"})
    }
    if(!password) {
        // Code 1: Front-End에서 정확한 Format으로 보내지 않았을 때 : Password를 보내지 않음
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "password"})
    }

    User.login(account)
        .then((user) => {
            if(!user) {
                // Code 2 : User Id가 틀린 경우
                return res.status(404).send({code: '404', error: 2})
            }
            else {
                if(user.password !== password) {
                    // Code 2: User Password가 틀렸을 경우
                    return res.status(404).send({code: '404', error: 2})
                }
                else {
                    // Success!
                    return res.send({
                        account: user.account,
                        token: 'Login-OK'
                    })
                }
                // console.log(user)
            }
        })
        .catch(err => res.status(500).send({code: '500', error: 3})) // Code 3 : BackEnd 나 DB 문제인 경우
        // 500 에러인 경우, FrontEnd에서는 무조건 서버 문제라고 띄어주면 됨.
})

router.post('/register', (req, res) => {
    // Error Code
    // 1 : front-end에서 account를 보내지 않았을때
    // 2 :
    // 3 : 500 에러 => Back-End나 DB 문제

    const account = req.body.account
    const accountname = req.body.accountname
    const phonenum = req.body.phonenum
    const password = req.body.password
    const cardcompany = req.body.cardcompany
    const cardnum = req.body.cardnum

    if(!account) {
        // Code 1: Front-End에서 정확한 Format으로 보내지 않았을 때 : Id를 보내지 않음
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "account"})
    }
    if(!accountname) {
        // Code 1: Front-End에서 정확한 Format으로 보내지 않았을 때 : Account Name를 보내지 않음
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "accountname"})
    }
    if(!phonenum) {
        // Code 1 : Front-End에서 정확한 Format으로 보내지 않았을 때 : Phone Number를 보내지 않음
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "phonenum"})
    }
    if(!password) {
        // Code 1: Front-End에서 정확한 Format으로 보내지 않았을 때 : Password를 보내지 않음
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "password"})
    }
    if(!cardcompany) {
        // Code 1: Front-End에서 정확한 Format으로 보내지 않았을 때 : Card Company를 보내지 않음
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "cardcompany"})
    }
    if(!cardnum) {
        // Code 1: Front-End에서 정확한 Format으로 보내지 않았을 때 : Card Number를 보내지 않음
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "cardnum"})
    }

    User.register(account, accountname, phonenum, password, cardcompany, cardnum)
        .then((register_result) => {
            // 구현하기
            // 우선, 똑같은 Id 있는지 DB에서 확인
            // 있으면 튕기기
            // 없으면 DB에 저장
        })
        .catch(err => res.status(500).send({code: '500', error: 3})) // Code 3 : BackEnd 나 DB 문제인 경우
})

router.post('/modify', (req, res) => {
    // Error Code
    // 1 : front-end에서 account를 보내지 않았을때
    // 2 :
    // 3 : 500 에러 => Back-End나 DB 문제

    const account = req.body.account
    const accountname = req.body.accountname
    const phonenum = req.body.phonenum
    const password = req.body.password
    const cardcompany = req.body.cardcompany
    const cardnum = req.body.cardnum

    if(!account) {
        // Code 1: Front-End에서 정확한 Format으로 보내지 않았을 때 : Id를 보내지 않음
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "account"})
    }
    if(!accountname) {
        // Code 1: Front-End에서 정확한 Format으로 보내지 않았을 때 : Account Name를 보내지 않음
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "accountname"})
    }
    if(!phonenum) {
        // Code 1 : Front-End에서 정확한 Format으로 보내지 않았을 때 : Phone Number를 보내지 않음
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "phonenum"})
    }
    if(!password) {
        // Code 1: Front-End에서 정확한 Format으로 보내지 않았을 때 : Password를 보내지 않음
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "password"})
    }
    if(!cardcompany) {
        // Code 1: Front-End에서 정확한 Format으로 보내지 않았을 때 : Card Company를 보내지 않음
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "cardcompany"})
    }
    if(!cardnum) {
        // Code 1: Front-End에서 정확한 Format으로 보내지 않았을 때 : Card Number를 보내지 않음
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "cardnum"})
    }

    User.modify(account, accountname, phonenum, password, cardcompany, cardnum)
        .then((register_result) => {
            // 구현하기
        })
        .catch(err => res.status(500).send({code: '500', error: 3})) // Code 3 : BackEnd 나 DB 문제인 경우
})

router.post('/bookmarks', (req, res) => {
    // Error Code
    // 1 : front-end에서 account를 보내지 않았을때
    // 2 :
    // 3 : 500 에러 => Back-End나 DB 문제

    const account = req.body.account

    if(!account) {
        // Code 1: Front-End에서 정확한 Format으로 보내지 않았을 때 : Id를 보내지 않음
        return res.status(404).send({code: '404', error: 1, shouldAttribute: "account"})
    }

    User.returnBookmarks(account)
        .then((register_result) => {
            // 구현하기
        })
        .catch(err => res.status(500).send({code: '500', error: 3})) // Code 3 : BackEnd 나 DB 문제인 경우
})

module.exports = router
