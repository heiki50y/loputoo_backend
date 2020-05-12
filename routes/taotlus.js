const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { check } = require('express-validator');

const {
    createUpdateTaotlus,
    currentUserTaotlus,
    getAllTaotlus,
    getTaotlus,
    getUlesanded,
    createUpdateCompany,
    getCompanyWithTaotlus,
    sendTaotlusIdWithEmail
} = require('../controller/taotlus.controller');

router.get('/me', protect, currentUserTaotlus);

router
  .route('/')
  .post(protect, createUpdateTaotlus)
  .get(protect, authorize('admin'), getAllTaotlus);

router
  .route('/:id')
  .get(protect, authorize('admin'), getTaotlus)
  
router.route('/:id/ulesanded').get(getUlesanded);
router.route('/send/:taotluseId').post(protect, sendTaotlusIdWithEmail);

router
  .route('/:taotluseId/company')
  .post(createUpdateCompany)
  .get(protect, authorize('admin'), getCompanyWithTaotlus);


module.exports = router;