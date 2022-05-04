const express = require('express')
const router = express.Router()
//
const basicMiddlewares = require('./utils/basic-middlewares');
const adminController = require('./auth-controller');
const validationUtils = require('../shared-utils/validation-utils');

router.use(basicMiddlewares);


///////////////////////////////////////
// ROUTES
///////////////////////////////////////
router.get(
    '/authorize-app',
    adminController.authorizeApp
);

router.post('/login',
    // validationUtils.authorizeRequest,
    // validationUtils.checkUserIsLogged,
    adminController.login
);

router.get('/logout',
    // validationUtils.authorizeRequest,
    validationUtils.checkUserIsLogged,
    adminController.logout
);

router.post('/signup',
    // validationUtils.authorizeRequest,
    adminController.signUp
);

// TODO: POST delete user
router.delete('/delete-user',
    // validationUtils.authorizeRequest,
    validationUtils.checkUserIsLogged,
    adminController.deleteUser
);


/////////////////////////////////
// UTILS
/////////////////////////////////

router.get('/logged-content',
    // validationUtils.authorizeRequest,
    validationUtils.checkUserIsLogged,
    adminController.loggedContent
);

router.get(
    '/restricted',
    validationUtils.authorizeRequest,
    adminController.restricted
);

// router.get('/get-all-users', adminController.getAllUsers);
// router.get('/check-username', adminController.usernameIsTaken);

//
module.exports = router;