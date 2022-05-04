const databaseManager = require('../../database/database-manager');
const pool = databaseManager.getPool();
const session = require('express-session');
const configManager = require('./config-manager');
const pgSession = require('connect-pg-simple')(session);
//
const express = require('express');
const router = express.Router();

//
databaseManager.checkConnection();

//
router.use(express.urlencoded({extended: false}));
router.use(express.json());

router.use(session(configManager.getSessionOptions({pgSession, pool})));


//
module.exports = router;