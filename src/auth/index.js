const express = require('express')
const router = express.Router()
//
const basicMiddlewares = require('./utils/basic-middlewares');
const adminController = require('./auth-controller');
const validationUtils = require('../shared-utils/validation-utils');


///////////////////////////////////////
// ROUTES
///////////////////////////////////////
router.use(basicMiddlewares);


router.get(
    '/authorize-app',
    adminController.authorizeApp
);

router.get(
    '/restricted',
    validationUtils.authorizeRequest,
    adminController.restricted
);

router.post('/signup', adminController.signUp);

// TODO
// router.get('/get-all-users', adminController.getAllUsers);
// router.get('/check-username', adminController.usernameIsTaken);

//
module.exports = router;