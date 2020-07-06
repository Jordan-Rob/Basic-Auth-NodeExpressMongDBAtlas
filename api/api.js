const express = require('express')
const router = express.Router()
const user = require('../models/users')
const { signupChecks } = require('../authValidation')

router.post('/signup', (request, response) => {
    const { error } = signupChecks(request.body)
    if (error) {
        return response.status(400).send(error.details[0].message)
    }

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