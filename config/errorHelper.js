'use strict'

class ProjectError extends Error {
  constructor (message) {
    super(message)
    this.message = message
    this.error = message
  }
}

module.exports.notFound = (err) => {
  const error = new ProjectError('NOT_FOUND')
  if (err) error.message = err
  error.code = 404
  return error
}

module.exports.badRequest = (err) => {
  const error = new ProjectError('BAD_REQUEST')
  if (err) error.message = err
  error.code = 400
  return error
}




