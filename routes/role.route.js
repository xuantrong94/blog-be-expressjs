const express = require('express');
const { createRole } = require('../controllers/role.controller.js');
const router = express.Router();

router.post('/create', createRole);

module.exports = router;
