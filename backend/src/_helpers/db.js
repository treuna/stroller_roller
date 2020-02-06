import mongoose from 'mongoose'
import * as userModel from '../models/user.model' 
import * as strollerModel from '../models/stroller.model'
// eslint-disable-next-line
const config =  require('../../config')

mongoose.connect(config.DB_ROUTE, { useNewUrlParser: true})
  .catch((e) => {
    console.error('Connection erro', e.message)
  })
mongoose.Promise = global.Promise

export default {
  User: userModel,
  Stroller: strollerModel
}
