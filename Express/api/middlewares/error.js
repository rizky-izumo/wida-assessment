const httpStatus = require('http-status');
const { isCelebrate } = require('celebrate');
const _ = require('lodash');
const APIError = require('../utils/APIError');

/**
 * Error handler. Send stacktrace only during development
 * @public
 */
const handler = (err, req, res, next) => {
  const response = {
    code: err.status || 422,
    message: err.message || httpStatus[err.status],
    errors: err.errors,
    stack: err.stack,
  };

  res.status(response.code);
  res.json(response);
};
exports.handler = handler;

/**
 * If error is not an instanceOf APIError, convert it.
 * @public
 */
exports.converter = (err, req, res, next) => {
  let convertedError = err;

  if (isCelebrate(err)) {
    const errObj = [];
    err.details.forEach((error) => {
      const errorExists = _.find(errObj, (item) => {
        if (item.field === error.path) {
          item.messages.push(error.message);
          item.types.push(error.type);
          return item;
        }
        return false;
      });

      if (!errorExists) {
        errObj.push({
          field: error.path,
          location: err._meta.source,
          messages: [error.message],
          types: [error.type],
        });
      }
    });
    convertedError = new APIError({
      message: 'Validation Error',
      errors: errObj,
      status: httpStatus.BAD_REQUEST,
      stack: err.stack,
    });
  } else if (!(err instanceof APIError)) {
    convertedError = new APIError({
      message: err.message,
      status: err.status,
      stack: err.stack,
    });
  }

  return handler(convertedError, req, res);
};

/**
 * Catch 404 and forward to error handler
 * @public
 */
exports.notFound = (req, res, next) => {
  const err = new APIError({
    message: 'Not found',
    status: httpStatus.NOT_FOUND,
  });
  return handler(err, req, res);
};
