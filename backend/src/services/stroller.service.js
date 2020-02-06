const db = require('_helpers/db')
const Stroller = db.Stroller

module.exports = {
  create,
  update,
  _delete,
  getAll,
  getById,
}

async function create(strollerParams) {
  //validate
  if (await Stroller.findOne({ name: strollerParams.name })) {
    throw 'Stroller "' + strollerParams.name + '" already excists'
  }

  const stroller = new Stroller(strollerParams)
  await stroller.save()
}

async function update(id, strollerParams) {
  const stroller = await Stroller.findById(id)

  //validate
  if (!stroller) throw 'Stroller not found'
  if (stroller.name !== strollerParams && await Stroller.findOne({ name: strollerParams.name })) {
    throw 'Strollername' + strollerParams.name + 'is aldready taken'
  }

  //copy params to stroller
  Object.assign(stroller, strollerParams)

  await stroller.save()
}

async function _delete(id) {
  await Stroller.findByIdAndRemove(id)
}

async function getById(id) {
  return await Stroller.findById(id).select('name')
}

async function getAll() {
  return await Stroller.find({}).select('name')
}
