import * as userConstants from '../_constants/user.constants'
import * as alertActions from './alert.actions'

export function login(username, password) {
  return dispatch => {
    dispatch(request({ username }))

    login(username, password)
      .then(
        user => {
          dispatch(success(user))
          history.push('/')
        },
        error => {
          dispatch(failure(error.toString()))
          dispatch(alert)
        }
        )
  }
}