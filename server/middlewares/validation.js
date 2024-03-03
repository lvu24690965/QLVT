const { throwErrorWithStatus } = require("./errorHandler");
const validateDto = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throwErrorWithStatus(400, error.details[0].message, res, next);
    }
    next();
  };
};
module.exports = validateDto;
