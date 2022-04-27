const errorController = require('../controllers/error-controller');
const express = require('express');
const router = express.Router();


///////////////////////////////////////
// ROUTES
///////////////////////////////////////
//
router.use(errorController.error404);


//
module.exports = router;