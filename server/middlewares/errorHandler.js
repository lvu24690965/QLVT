const errHandler = (err, req, res, next) => {
  const formattedMessage = err?.message?.replaceAll(`\"`, "");
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  return res.status(statusCode).json({
    success: false,
    mes: formattedMessage,
  });
};
const throwErrorWithStatus = (code, message, res, next) => {
  const formattedMessage = message?.replaceAll(`\"`, "");
  const err = new Error(formattedMessage);
  res.status(code);
  next(err);
};

const badRequestException = (req, res, next) => {
  const err = new Error(`Route ${req.originalUrl} not found`);
  res.status(404);
  next(err);
};
module.exports = { errHandler, throwErrorWithStatus, badRequestException };
