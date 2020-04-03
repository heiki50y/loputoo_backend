const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check } = require('express-validator');

const {
    createUpdateTaotlus,
    getAllTaotlus,
    getTaotlus,
    createUpdateCompany,
    getCompanyWithTaotlus
} = require('../controller/taotlus.controller');


router
  .route('/')
  .post([
    auth,
    [
      check('eriala', 'Eriala is required')
        .not()
        .isEmpty(),
      check('ulesanded', 'Ulesanded is required')
        .not()
        .isEmpty()
    ]
  ], createUpdateTaotlus)
  .get(getAllTaotlus);

router
  .route('/:id')
  .get(getTaotlus);

router
  .route('/:taotluseId/company')
  .post(createUpdateCompany)
  .get(getCompanyWithTaotlus);


module.exports = router;