const express = require("express");
const MediaOwner = express.Router();
const { MediaOwnerController } = require("../controllers/mediaowner");
const validationMiddleware = require("../middleware/validation");
const MediaOwnerValidations = require("../validations/mediaowner");

MediaOwner.post(
  "/create",
  validationMiddleware(MediaOwnerValidations.create),
  MediaOwnerController.create
);
MediaOwner.get(
  "/",
  MediaOwnerController.getAll
);
MediaOwner.get(
  "/get",
  validationMiddleware(MediaOwnerValidations.get, (isGet = true)),
  MediaOwnerController.get
);
MediaOwner.put(
  "/update",
  validationMiddleware(MediaOwnerValidations.update),
  MediaOwnerController.update
);
MediaOwner.delete(
  "/delete",
  validationMiddleware(MediaOwnerValidations.delete, (isGet = true)),
  MediaOwnerController.delete
);

module.exports = MediaOwner;
