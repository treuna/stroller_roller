import config from 'config'
import authHeader from '../_helpers/auth.header'

export function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user')
}

function handleResponse(response) {
  return response.text()
    .then((text) => {
      const data = text && JSON.parse(text)
      if (!response.ok) {
        if (response.status === 401) {
          // auto logout if 401 from api
          logout()
          location.reload(true)
        }
        const error = (data && data.message) || response.statusText
        return Promise.reject(error)
      }
      return data
    })
}

export function login(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  }

  return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      // user details and jwt token are stored in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user))
      return user
    })
}

export function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }

  return fetch(`${config.apiUrl}/users`, requestOptions)
    .then(handleResponse)
}

export function getById(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }

  return fetch(`${config.apiUrl}/users${id}`, requestOptions)
    .then(handleResponse)
}

export function register(user) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user })
  }

  return fetch(`${config.apiUrl}/register`, requestOptions)
    .then(handleResponse)
}


export function update(user) {
    const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user })
  }

  return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions)
    .then(handleResponse)
}


export function deleteUser(id) {
    const requestOptions = {
    method: 'DELETE',
    headers: authHeader()
  }

  return fetch(`${config.apiUrl}/users/${id}`, requestOptions)
    .then(handleResponse)
}
