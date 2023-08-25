const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/admin/register',authController.createAdmin);
router.post('/superadmin/register',authController.createSuperAdmin);

module.exports = router;
