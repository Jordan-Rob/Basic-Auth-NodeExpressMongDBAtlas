const express = require('express')
const router = express.Router()
const user = require('../models/users')

router.post('/signup', (request, response) => {
    const newUser = new user({
        username: request.body.username,
        email: request.body.email,
        password: request.body.password,
    })
    newUser.save()
        .then((data) => {
            response.json(data)
        })
        .catch((error) => {
            response.json(error)
        })
})

module.exports = router