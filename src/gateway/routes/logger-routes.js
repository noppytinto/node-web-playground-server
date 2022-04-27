const loggerController = require('../controllers/logger-controller');
const express = require('express')
const router = express.Router()


///////////////////////////////////////
// ROUTES
///////////////////////////////////////
router.use(loggerController.logRequests);


//
module.exports = router;