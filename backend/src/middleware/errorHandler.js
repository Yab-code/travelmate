/**
 * Global async error handler.
 * Any next(err) or thrown error in an async route lands here.
 */
const errorHandler = (err, req, res, next) => {
  console.error('[Error]', err.message);

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Internal server error',
  });
};

module.exports = { errorHandler };
