const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Taotlus = require('../models/Taotlus');
const Company = require('../models/Company');
const User = require('../models/User');

router.post(
    '/',
    [
      auth,
      [
        check('eriala', 'Status is required')
          .not()
          .isEmpty(),
        check('ulesanded', 'Skills is required')
          .not()
          .isEmpty()
      ]
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const {
        opilase_nimi,
        oppegrupp,
        eriala,
        periood,
        maht,
        ulesanded,
        ettevote_email
      } = req.body;
  
      const taotluseFields = {
        user: req.user.id,
        opilase_nimi,
        oppegrupp,
        eriala,
        periood,
        maht,
        ettevote_email,
        ulesanded: Array.isArray(ulesanded)
          ? ulesanded
          : ulesanded.split(',').map(ulesanded => ' ' + ulesanded.trim()),
      };
  
      try {

       
        let taotlus = await Taotlus.findOneAndUpdate(
          { user: req.user.id },
          { $set: taotluseFields },
          { new: true, upsert: true }
        );

        res.json(taotlus);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
);

router.get('/', async (req, res) => {
    try {
    
    const student = await Taotlus.find().populate('user', ['name', 'group'])
      
      res.json({
          student
      });

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});

router.get('/:id', 
 
    async (req, res) => {
    try {
       
        const taotlus = await Taotlus.findById(req.params.id).populate('user' ['name', 'group']);

  
      if (!taotlus) return res.status(400).json({ msg: 'Taotlus not found' });
  
      res.json({
          taotlus
      });
    } catch (err) {
      console.error(err.message);
      if (err.kind == 'ObjectId') {
        return res.status(400).json({ msg: 'Profile not found' });
      }
      res.status(500).send('Server Error');
    }
});


router.post(
    '/:taotluseId/company',
    async (req, res) => {
      req.body.taotlus = req.params.taotluseId
      try {

        const taotlus = await Taotlus.findById(req.params.taotluseId);

        if (!taotlus) return res.status(400).json({ msg: 'Taotlus not found' });

        const company = await Company.create(req.body);

        res.json(company);

      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
);

router.get(
    '/:toutluseId/company',
    async (req, res) => {
      try {

        const data = await Company.find({ taotlus: req.params.toutluseId }).populate('taotlus');
        
        res.json(data);
         
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
);

router.get(
    '/:toutluseId/company/:id',
    async (req, res) => {
      try {
        const company = await Company.findById(req.params.id).populate('taotlus')
        
        res.json(company);
          
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
);


module.exports = router;