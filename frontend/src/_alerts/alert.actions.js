import { SUCESS, ERROR, CLEAR } from '../_constants/alert.constants' 

export function success(message) {
  return (type: SUCESS, message)
}

export function error(message) {
  return (type: ERROR, message)
}

export function clear(message) {
  return (type: CLEAR, message)
}
