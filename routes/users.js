const express = require('express');
const router = express.Router();

const {
    getMe
} = require('../controller/user.controller');

const { protect, authorize } = require('../middleware/auth');


router.get('/me', protect, getMe);

module.exports = router;