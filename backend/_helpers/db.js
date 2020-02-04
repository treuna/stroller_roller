const mongoose = require('mongoose')

const config = require('config.json')

mongoose.connect(config.DB_ROUTE, { useNewUrlParser: true})
  .catch(e => {
    console.error('Connection erro', e.message)
  })
mongoose.Promise = global.Promise

const db = mongoose.connection

module.exports = {
  User: require('../user/user.model')
}
