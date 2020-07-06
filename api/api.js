const express = require('express')
const router = express.Router()
const user = require('../models/users')
const { signupChecks, loginChecks } = require('../authValidation')
const bcrypt = require('bcrypt')
const { request } = require('express')

router.post('/signup', async (request, response) => {
    const { error } = signupChecks(request.body)
    if (error) {
        return response.status(400).send(error.details[0].message)
    }

    const existingEmail = await user.findOne({ email: request.body.email })
    if (existingEmail) {
        return response.status(400).send('Email already in use!')
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

router.post('/login', async (request, response) => {
    const { error } = loginChecks(request.body)
    if (error) {
        return response.status(400).send(error.details[0].message)
    }

    const appUser = await user.findOne({ email: request.body.email })
    if (!appUser) {
        return response.status(400).send('cannot find user with entered email')
    }

    const correctPassword = await bcrypt.compare(request.body.password, appUser.password)
    if (!correctPassword) {
        return response.status(400).send('Incorrect password entered!')
    }
    return response.send('logged in successfully')
})

module.exports = router