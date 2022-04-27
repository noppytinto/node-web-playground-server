const testController = require('../controllers/test-controller');
const express = require('express')
const router = express.Router()


///////////////////////////////////////
// ROUTES
///////////////////////////////////////
//
router.get('/hello', testController.hello);

router.get('/secret', testController.secret);



//
module.exports = router;