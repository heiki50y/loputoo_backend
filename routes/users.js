const express = require('express');
const router = express.Router();

const {
    getMe,
    getAllUsers,
    getUser
} = require('../controller/user.controller');

const { protect, authorize } = require('../middleware/auth');


router.get('/me', protect, getMe);
router.get('/', protect, authorize('admin'), getAllUsers);
router.get('/:id', protect, authorize('admin'), getUser)

module.exports = router;