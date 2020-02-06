import rootpath from 'rootpath'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import jwt from './_helpers/jwt'
import  errorHandler from './_helpers/error-handler'
import controller from './controller/controller'

rootpath()
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

// JWT to secure the api
app.use(jwt())

// routes
app.use('/', controller)
app.use(errorHandler)

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
