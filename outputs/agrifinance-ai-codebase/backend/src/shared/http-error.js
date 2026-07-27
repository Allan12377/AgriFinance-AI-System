class HttpError extends Error {
  constructor(statusCode, message, details = null) {
    super(message);
    this.name = "HttpError";
    this.statusCode = statusCode;
    this.details = details;
  }
}

function notFound(message = "Resource not found") {
  return new HttpError(404, message);
}

function badRequest(message, details = null) {
  return new HttpError(400, message, details);
}

module.exports = { HttpError, badRequest, notFound };
