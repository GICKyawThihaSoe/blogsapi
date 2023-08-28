const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/admin/register',authController.createAdmin);
router.post('/superadmin/register',authMiddleware.authenticateUser ,authController.createSuperAdmin);

module.exports = router;
