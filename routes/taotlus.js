const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { check } = require('express-validator');

const {
    createUpdateTaotlus,
    currentUserTaotlus,
    getAllTaotlus,
    getTaotlus,
    createUpdateCompany,
    getCompanyWithTaotlus
} = require('../controller/taotlus.controller');

router.get('/me', protect, currentUserTaotlus);

router
  .route('/')
  .post([
    protect,
    [
      check('eriala', 'Eriala is required')
        .not()
        .isEmpty(),
      check('ulesanded', 'Ulesanded is required')
        .not()
        .isEmpty()
    ]
  ], createUpdateTaotlus)
  .get(protect, authorize('admin'), getAllTaotlus);

router
  .route('/:id')
  .get(getTaotlus);

router
  .route('/:taotluseId/company')
  .post(createUpdateCompany)
  .get(protect, authorize('admin'), getCompanyWithTaotlus);


module.exports = router;