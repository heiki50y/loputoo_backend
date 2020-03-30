const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Company = require('../models/Company');


router.post(
    '/',
    async (req, res) => {
     
      try {
        const company = await Company.create(req.body);
    
        res.json(company);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
);

module.exports = router;