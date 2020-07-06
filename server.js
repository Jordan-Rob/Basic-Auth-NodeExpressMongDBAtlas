const express = require('express')
const app = express()
const apiUrls = require('./api/api')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config()
mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log('DB has been connected')
})
app.use(express.json())
app.use('/api/auth', apiUrls)

app.listen(3000, () => {
    console.log('server is up & running')
})