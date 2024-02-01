const express = require('express');
const router = express.Router();
const adminRouter = require('./admin');
const MediaOwner = require('./mediaowner');
const MediaLibrary = require('./medialibrary');

const setRouter = (app) => {
  app.use('/api/v1', router);
  router.use(`/admin`, adminRouter);
  router.use(`/media-owner`, MediaOwner);
  router.use(`/media-library`, MediaLibrary);
};

module.exports = { setRouter };
