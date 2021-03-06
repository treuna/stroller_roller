function errorHandler(err, req, res) {
  if (typeof (err) === 'string') {
    // custom application error
    return res.status(400).json({message: err})
  }

  if (err.name === 'ValidationErro') {
    // mongoose validation error
    return res.status(400).json({message: err.message})
  }

  if (err.name === 'UnauthorizedErro') {
    // jwt authentication error
    return res.status(401).json({message: 'Invalid token'})
  }

  // default to 500 server error
  return res.status(500).json({message: err.message})
}

export default errorHandler