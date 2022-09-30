const express = require('express');
const router = express.Router();
const {
    authUser,
    signup,
    signin
} = require('../controllers/authController');

const { authMiddleware } = require('../middlewares');

router.get('/auth', authMiddleware, authUser);
router.post('/auth/signup', signup);
router.post('/auth/signin', signin);

module.exports = router;