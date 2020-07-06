const express = require('express')
const router = express.Router()
const user = require('../models/users')
const { signupChecks } = require('../authValidation')
const bcrypt = require('bcrypt')

router.post('/signup', async (request, response) => {
    const { error } = signupChecks(request.body)
    if (error) {
        return response.status(400).send(error.details[0].message)
    }

    const saltPassword = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(request.body.password, saltPassword)

    const newUser = new user({
        username: request.body.username,
        email: request.body.email,
        password: hashedPassword,
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