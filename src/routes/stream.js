const express = require("express");
const streamRouter = express.Router();
const {StreamController} = require('../controllers/stream');

const authenticate = require('../middleware/api/key-authenticate');
const authorize = require('../middleware/api/key-authorize');

streamRouter.get('/token', 
    authenticate, 
    authorize(['cee-store-service']),
    StreamController.getToken
);

streamRouter.get('/manifest', 
    authenticate, 
    authorize(['cee-store-service']),
    StreamController.getManifest
);

streamRouter.get('/token/verify', 
    authenticate, 
    authorize(['cee-publisher-tool']),
    StreamController.verifyToken
);

module.exports = streamRouter;