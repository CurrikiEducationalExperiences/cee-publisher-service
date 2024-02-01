const express = require("express");
const MediaLibrary = express.Router();
const { MediaLibraryController } = require("../controllers/medialibrary");
const validationMiddleware = require("../middleware/validation");
const MediaLibraryValidations = require("../validations/medialibrary");

MediaLibrary.post(
  "/create",
  validationMiddleware(MediaLibraryValidations.create),
  MediaLibraryController.create
);
MediaLibrary.get(
  "/",
  MediaLibraryController.getAll
);
MediaLibrary.get(
  "/get",
  validationMiddleware(MediaLibraryValidations.get, (isGet = true)),
  MediaLibraryController.get
);
MediaLibrary.put(
  "/update",
  validationMiddleware(MediaLibraryValidations.update),
  MediaLibraryController.update
);
MediaLibrary.delete(
  "/delete",
  validationMiddleware(MediaLibraryValidations.delete, (isGet = true)),
  MediaLibraryController.delete
);

module.exports = MediaLibrary;
