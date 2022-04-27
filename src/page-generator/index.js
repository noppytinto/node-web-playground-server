const pageGeneratorController = require('./page-generator-controller');
const validationUtils = require('../shared-utils/validation-utils');
const express = require('express');
const router = express.Router();

//
const basicMiddlewares = require('./utils/basic-middlewares');

// TODO: set view engine when transitioning to microservices

///////////////////////////////////////
// ROUTES
///////////////////////////////////////
router.use(basicMiddlewares);

//
router.post(
    '/generate',
    validationUtils.authorizeRequest,
    pageGeneratorController.generate
);

// router.get(
//     '/request',
//     pageGeneratorController.request
// );


//
module.exports = router;