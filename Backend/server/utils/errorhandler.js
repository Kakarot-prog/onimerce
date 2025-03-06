// make a error handler
class ErrorHandler extends Error {
  constructor(message, statuscode) {
    super(message);
    this.statusCode = statuscode;
    Error.captureStackTrace(this, this.constructor);
    return this;
  }
}

export default ErrorHandler;
