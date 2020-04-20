const { validationResult } = require('express-validator');

const Taotlus = require('../models/Taotlus');
const Company = require('../models/Company');
const User = require('../models/User');

exports.createUpdateTaotlus = async (req, res, next) => {
    try {

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
            ulesanded
            // ulesanded: Array.isArray(ulesanded)
            //   ? ulesanded
            //   : ulesanded.split(',').map(ulesanded => ' ' + ulesanded.trim()),
        };
      
        let taotlus = await Taotlus.findOneAndUpdate(
            { user: req.user.id },
            { $set: taotluseFields },
            { new: true, upsert: true }
        );

        res.status(201).json(taotlus);
        
    } catch (err) {
        next(err)
    }
}

exports.getAllTaotlus = async (req, res, next) => {
    try {
    
        const student = await Taotlus.find().populate('user', ['name', 'group'])
          
        res.status(201).json(student);
    
    } catch (err) {
        next(err)
    }
}

exports.currentUserTaotlus = async (req, res, next) =>{
    try {
        const taotlus = await Taotlus.findOne({ user: req.user.id }).populate('user', ['name', 'group'])

        if (!taotlus) return res.status(400).json({ msg: 'There is no taotlus for this user' });

        res.status(201).json(taotlus);

    } catch (err) {
        next(err)
    }
}

exports.getTaotlus = async (req, res, next) => {
    try {
       
        const taotlus = await Taotlus.findById(req.params.id).populate('user' ['name', 'group']);

  
        if (!taotlus) return res.status(400).json({ msg: 'Taotlus not found' });
  
        res.status(201).json(taotlus);
    } catch (err) {
        next(err);
    }
}

exports.getUlesanded = async (req, res, next) => {
    try {
       
        const taotlus = await Taotlus.findById(req.params.id).select('ulesanded opilase_nimi');

  
        if (!taotlus) return res.status(400).json({ msg: 'Taotlus not found' });
  
        res.status(201).json(taotlus);
    } catch (err) {
        next(err);
    }
}

exports.createUpdateCompany = async (req, res, next) => {
    try {

        req.body.taotlus = req.params.taotluseId

        const taotlus = await Taotlus.findById(req.params.taotluseId);

        if (!taotlus) return res.status(400).json({ msg: 'Taotlus not found' });

        const {
            ettevote_nimi,
            telefon,
            aadress,
            lepingu_solmija,
            lepingu_alus,
            juhendaja,
            juhendaja_telefon,

        } = req.body;

        const companyFileds = {
            taotlus: req.params.taotluseId,
            ettevote_nimi,
            telefon,
            aadress,
            lepingu_solmija,
            lepingu_alus,
            juhendaja,
            juhendaja_telefon,
        }

        let company = await Company.findOneAndUpdate(
            { taotlus: req.params.taotluseId },
            { $set: companyFileds },
            { new: true, upsert: true }
        );

        res.status(201).json(company);
         
    } catch (err) {
        next(err)
    }
}

exports.getCompanyWithTaotlus = async (req, res, next) => {
    try {

        const data = await Company.find({ taotlus: req.params.taotluseId }).populate('taotlus');
        
        res.status(201).json(data);
         
    } catch (err) {
        next(err)
    }
}



