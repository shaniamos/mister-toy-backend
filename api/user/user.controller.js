const express = require('express')
const userService = require('../../services/user.service')
const router = express.Router()

module.exports = router

//Express Routing:
//Auth API:
router.get('/', (req, res) => {
    userService.query()
    .then(users => res.send(users))
})
router.get('/:userId', (req, res) => {
    const { userId } = req.params
    
    userService.getById(userId)
        .then(user => res.send(user))
})
router.post('/logout', (req, res) => {
    res.clearCookie('loginToken')
    res.send('Logged out')
})

router.post('/login', (req, res) => {
    const credentials = req.body

    userService.checkLogin(credentials)
        .then(user => {
            if (user) {
                const loginToken = userService.getLoginToken(user)
                res.cookie('loginToken', loginToken)
                res.send(user)
            } else {
                console.log('No such user');
                res.status(403).send('Invalid Credentials')
            }
        })
})

router.post('/signup', (req, res) => {
    const credentials = req.body

    userService.signup(credentials)
        .then(user => {
            const loginToken = userService.getLoginToken(user)
            res.cookie('loginToken', loginToken)
            res.send(user)
        })
        .catch((err) => {
            console.log('error', err)
            res.status(400).send('Cannot signup')
        })

})