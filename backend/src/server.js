require('rootpath')()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const controller = require('./controller/controller')
const jwt = require('_helpers/jwt')
const errorHandler = require('_helpers/error-handler')


const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

//JWT to secure the api
app.use(jwt())

//routes
// app.use(['/stroller', '/strollers','/user', '/users'], controller)
app.use('/', controller)
app.use(errorHandler)

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000
const server = app.listen(port, function () {
  console.log('Server running on port ' + port)
})
