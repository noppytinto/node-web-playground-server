const cors = require('cors');
const configManager = require('../utils/config-manager');
const express = require('express');
const router = express.Router();


//
router.use(cors(configManager.getCorsOptions()));


//
module.exports = router;