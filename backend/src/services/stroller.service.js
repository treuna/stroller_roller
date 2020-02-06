import db from '../_helpers/db'

const { Stroller } = db

async function create(strollerParams) {
  // validate
  if (await Stroller.findOne({ name: strollerParams.name })) {
    throw new Error(`Stroller "${strollerParams.name}" already excists`)
  }

  const stroller = new Stroller(strollerParams)
  await stroller.save()
}

async function update(id, strollerParams) {
  const stroller = await Stroller.findById(id)

  // validate
  if (!stroller) throw new Error('Stroller not found')
  if (stroller.name !== strollerParams && await Stroller.findOne({ name: strollerParams.name })) {
    throw new Error(`Strollername "${strollerParams.name}" is aldready taken`)
  }

  // copy params to stroller
  Object.assign(stroller, strollerParams)

  await stroller.save()
}

async function deleteId(id) {
  await Stroller.findByIdAndRemove(id)
}

async function getById(id) {
  return Stroller.findById(id).select('name')
}

async function getAll() {
  return Stroller.find({}).select('name')
}

export default {
  create,
  update,
  deleteId,
  getAll,
  getById,
}