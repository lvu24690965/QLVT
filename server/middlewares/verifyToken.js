const jwt = require("jsonwebtoken");
const { throwErrorWithStatus } = require("./errorHandler");
const db = require("../models");
const verifyToken = (req, res, next) => {
  const token = req.headers?.authorization?.startsWith("Bearer");
  if (!token) {
    return throwErrorWithStatus(401, "Access token not found", res, next);
  }
  const rawToken = req.headers?.authorization?.split(" ")[1];
  jwt.verify(rawToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return throwErrorWithStatus(401, "Invalid token", res, next);
    }
    req.user = decoded;
    next();
  });
};
const isUser = (req, res, next) => {
  const { roleCode } = req.user;
  if (roleCode !== "ROL1" && roleCode !== "ROL5" && roleCode !== "ROL3") {
    return throwErrorWithStatus(403, "You don't have permission", res, next);
  }
  next();
};
const isAdmin = (req, res, next) => {
  const { roleCode } = req.user;
  if (roleCode !== "ROL1") {
    return throwErrorWithStatus(403, "You don't have permission", res, next);
  }
  next();
};
const isManager = (req, res, next) => {
  const { roleCode } = req.user;
  if (roleCode !== "ROL1" && roleCode !== "ROL3") {
    return throwErrorWithStatus(403, "You don't have permission", res, next);
  }
  next();
};
module.exports = { verifyToken, isUser, isAdmin, isManager };
