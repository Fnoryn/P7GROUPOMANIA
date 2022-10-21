// import
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const checkEmail = require('../middleware/email-validator');
const checkPassword = require('../middleware/password-validator');
const limit = require('../middleware/limiter');


// routes
router.post('/signup', checkEmail, checkPassword, userCtrl.signup);
router.post('/login', limit.max, userCtrl.login);

// export
module.exports = router;