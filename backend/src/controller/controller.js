const express = require('express')

const userService = require('../services/user.service')
const strollerService = require('../services/stroller.service')

const router = express.Router()

// routes
router.post('/user/authenticate', authenticateUser)
router.post('/user/register', registerUser)
router.get('/users', getAllUsers)
router.get('/user/current', getCurrentUser)
router.get('/user/:id', geUsertById)
router.put('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)
router.post('/stroller', createStroller)
router.put('/stroller/:id',updateStroller)
router.delete('/stroller/:id', deleteStroller)
router.get('/stroller/:id', getStrollerById)
router.get('/strollers', getAllStrollers)

module.exports = router

function authenticateUser(req, res, next) {
  userService.authenticate(req.body)
    .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password incorrect' }))
    .catch(err => next(err))
}

function registerUser(req, res, next) {
  userService.create(req.body)
    .then(() => res.json({}))
    .catch(err => next(err))
}

function getAllUsers(req, res, next) {
  userService.getAll()
    .then(() => res.json({users}))
    .catch(err => next(err))
}

function getCurrentUser(req, res, next) {
  userService.getById(req.user.sub)
    .then(user => user ? res.json(user) : res.sendStatus(404))
    .catch(err => next(err))
}

function geUsertById(req, res, next) {
  userService.getById(req.params.id)
    .then(user => user ? res.json(user) : res.sendStatus(404))
    .catch(err => next(err))
}

function updateUser(req, res, next) {
  userService.update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch(err => next(err))
}

function deleteUser(req, res, next) {
  userService._delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err))
}

function createStroller(req, res, next) {
  strollerService.create(req.body)
    .then(() => res.json({}))
    .catch(err => next(err))
}

function updateStroller(req, res, next) {
  strollerService.update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch(err => next(err))
}

function deleteStroller(req, res, next) {
  strollerService._delete(req.params.id)
  .then(() => res.json({}))
  .catch(err => next(err))
}

function getStrollerById(req, res, next) {
  strollerService.getById(req.params.id)
    .then(stroller => stroller ? res.json(stroller) : res.sendStatus(404))
    .catch(err => next(err))
}

function getAllStrollers(req, res, next) {
  strollerService.getAll()
    .then(strollers => res.json({strollers}))
    .catch(err => next(err))
}
