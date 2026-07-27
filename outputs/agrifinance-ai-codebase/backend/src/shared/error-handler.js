const { HttpError } = require("./http-error");

function errorHandler(error, _req, res, _next) {
  if (error instanceof HttpError) {
    return res.status(error.statusCode).json({
      error: error.message,
      details: error.details,
    });
  }

  console.error(error);
  return res.status(500).json({ error: "Internal server error" });
}

module.exports = { errorHandler };
