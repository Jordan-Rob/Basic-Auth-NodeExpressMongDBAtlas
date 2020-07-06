const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        min: 4
    },
    email: {
        type: String,
        min: 4
    },
    password: {
        type: String,
        min: 5
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('userDB', userSchema)