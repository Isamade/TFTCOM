const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares');
const { getProfiles, getProfile, deleteProfile, updateProfile, createProfile } = require('../controllers/userController');

router.get('/user/profiles', authMiddleware, getProfiles);
router.get('/user/:id/profile', authMiddleware, getProfile);
router.delete('/user/:id/profile', authMiddleware, deleteProfile);
router.patch('/user/:id/profile', authMiddleware, updateProfile);
router.post('/user/createProfile', createProfile);

module.exports = router;