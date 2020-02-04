require('rootpath')()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const jwt = require('_helpers/jwt')
const userController = require('./user/user.controller')
const errorHandler = require('_helpers/error-handler')


const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(jwt())
app.use('/users', userController)
app.use(errorHandler)

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000
const server = app.listen(port, function () {
  console.log('Server running on port ' + port)
})
