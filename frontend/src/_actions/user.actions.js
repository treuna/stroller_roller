import * as userConstants from '../_constants/user.constants'
import * as userServices from '../_services/user.services'
import * as alertActions from './alert.actions'
import history from '../_helpers/history'

export function login(username, password) {
  function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
  function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
  function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }

  return (dispatch) => {
    dispatch(request({ username }))

    userServices.login(username, password)
      .then(
        (user) => {
          dispatch(success(user))
          history.push('/')
        },
        (error) => {
          dispatch(failure(error.toString()))
          dispatch(alertActions.error(error.toString()))
        }
      )
  }
}

export function logout() {
  userServices.logout()
  return { type: userConstants.LOGOUT}
}

export function register(user) {

  function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
  function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
  function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }

  return (dispatch) => {
    dispatch(request(user))

    userServices.request(user)
      .then(
        () => {
          dispatch(success())
          history.push('/login')
          dispatch(alertActions.success('Registration successful'))
        },
        (error) => {
          dispatch(failure(error.toString()))
          dispatch(alertActions.error(error.toString()))
        }
      )
  }
}

export function getAll() {
  function request() { return { type: userConstants.GETALL_REQUEST } }
  function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
  function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }

  return (dispatch) => {
    dispatch(request())

    userServices.getAll()
      .then(
        (users) => dispatch(success(users)),
        (error) => dispatch(failure(error.toString()))
        )
  }
}

export function DeleteUser(id) {
  function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
  function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
  function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }

  return (dispatch) => {
    dispatch(request(id))

    userServices.deleteUser(id)
      .then(
        (user) => dispatch(success(id)),
        (error) => dispatch(failure(id, error.toString()))
        )
  }
}