import * as userConstants from '../_constants/user.constants'
import * as alertActions from './alert.actions'
import history from '../_helpers/history'

export function login(username, password) {
  function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
  function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
  function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }

  return (dispatch) => {
    dispatch(request({ username }))

    login(username, password)
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
  logout()
  return { type: userConstants.LOGOUT}
}