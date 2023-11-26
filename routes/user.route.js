const express = require('express');
const {
  updateUserInfo,
  updateUserRole,
  getUsers,
} = require('../controllers/user.controller');
const router = express.Router();

router.get('/', getUsers);
router.put('/:id/role', updateUserRole);
router.put('/:id/info', updateUserInfo);

module.exports = router;
