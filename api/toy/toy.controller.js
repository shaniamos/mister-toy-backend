const express = require('express')
const toyService = require('../../services/toy.service')
const router = express.Router()

module.exports = router

// LIST
router.get('/', (req, res) => {
    console.log('req', req.query)
    const newData = req.query.params
    console.log(newData)
    // const price = req.query.price
    const filterBy = JSON.parse(req.query.params)
    // const filterBy = {
    //     name: req.query.price || '',
    //     price: req.query.price || '',
    //     labels: req.query.labels || [],
    //     inStock: req.query.inStock || undefined,
    // }
    // if (req.query.pageIdx) filterBy.pageIdx = req.query.pageIdx
    // if (req.query.userId) filterBy.userId = req.query.userId

    toyService.query(filterBy)
        .then(toys => res.send(toys))
})


// READ
router.get('/:toyId', (req, res) => {
    const { toyId } = req.params
    toyService.getById(toyId)
        .then(toy => res.send(toy))
})


// CREATE
router.post('/', (req, res) => {
    // const loggedinUser = userService.validateToken(req.cookies.loginToken)
    // if (!loggedinUser) return res.status(401).send('Cannot add toy')

    // console.log('POST REQ from user', loggedinUser)

    const toy = req.body
    // toy.owner = loggedinUser
    toyService.save(toy)
        .then(toy => res.send(toy))
})

// UPDATE
router.put('/:toyId', (req, res) => {
    // const loggedinUser = userService.validateToken(req.cookies.loginToken)
    // if (!loggedinUser) return res.status(401).send('Cannot update toy')

    const toy = req.body
    toyService.save(toy)
        .then(toy => res.send(toy))
        .catch((err) => {
            console.log('error', err)
            res.status(400).send('Cannot update toy')
        })
    // toyService.save(toy, loggedinUser)
    //     .then(toy => res.send(toy))
    //     .catch((err) => {
    //         console.log('error', err)
    //         res.status(400).send('Cannot update toy')
    //     })
})

// DELETE
router.delete('/:toyId', (req, res) => {
    // const loggedinUser = userService.validateToken(req.cookies.loginToken)
    // if (!loggedinUser) return res.status(401).send('Cannot remove toy')

    const { toyId } = req.params
    toyService.remove(toyId)
        .then(() => res.send({ msg: 'Removed succesfully' }))
        .catch((err) => {
            console.log('error', err)
            res.status(400).send('Cannot remove toy')
        })

    // const { toyId } = req.params
    // toyService.remove(toyId, loggedinUser)
    //     .then(() => res.send({ msg: 'Removed succesfully' }))
    //     .catch((err) => {
    //         console.log('error', err)
    //         res.status(400).send('Cannot remove toy')
    //     })
})

