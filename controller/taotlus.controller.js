const { validationResult } = require('express-validator');

const Taotlus = require('../models/Taotlus');
const Company = require('../models/Company');
const User = require('../models/User');

const moment = require('moment');
const nodemailer = require('nodemailer');
const config = require('config');
const puppeteer = require('puppeteer')
const fs = require('fs')


exports.createUpdateTaotlus = async (req, res, next) => {
    try {

            // const errors = validationResult(req);
            // if (!errors.isEmpty()) {
            //     return res.status(400).json({ errors: errors.array(errors.msg) });
            // }

        const date = moment().format("DD.MM.YYYY")
        
        const {
            opilase_nimi,
            oppegrupp,
            eriala,
            periood,
            maht,
            ulesanded,
            ettevote_email,
        } = req.body;
      
        const taotluseFields = {
            user: req.user.id,
            opilase_nimi,
            oppegrupp,
            eriala,
            periood,
            maht,
            ettevote_email,
            ulesanded,
            date
            
            // ulesanded: Array.isArray(ulesanded)
            //   ? ulesanded
            //   : ulesanded.split(',').map(ulesanded => ' ' + ulesanded.trim()),
        };
      
        let taotlus = await Taotlus.findOneAndUpdate(
            { user: req.user.id },
            { $set: taotluseFields },
            { new: true, upsert: true }
        );

       
        await Taotlus.find({ _id: taotlus.id })

        const output = `
            <ul>  
                <li>Õpilane ${taotlus.opilase_nimi}</li>
                <li>${taotlus.eriala}</li>
                <li>www.domain.ee/taotlus/${taotlus.id}</li>
                <li>Praktika taotluse <a href="www.domain.ee/taotlus/${taotlus.id}">LINK</a></li>
            </ul>
        `;

        let transporter = nodemailer.createTransport({
            // service: 'gmail',
            host: config.get('MAIL_HOST'),
            port: 2525,
            auth: {
                user: config.get('MAIL_USER'),
                pass: config.get('MAIL_PASSWOD')
            }
        });
       
        let mailOptions = {
            from: 'praktika@khk.ee', 
            to: taotlus.ettevote_email, // list of receivers
            subject: `${taotlus.opilase_nimi} praktika dokumendi link`, // Subject line
            text: 'Hello world?', // plain text body
            html: output // html body
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
        });

        res.status(201).json({
            taotlus
        });

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
            praktikakoha_nimi,
            praktikakoha_epost,
            praktikakoha_tel,
            praktikakoha_address,
            allkirjastamis_alus,
            praktikajuhedaja_nimi_amet,
            praktikajuhendaja_tel,
            praktikajuhendaja_epost
        } = req.body;

        const companyFileds = {
            taotlus: req.params.taotluseId,
            praktikakoha_nimi,
            praktikakoha_epost,
            praktikakoha_tel,
            praktikakoha_address,
            allkirjastamis_alus,
            praktikajuhedaja_nimi_amet,
            praktikajuhendaja_tel,
            praktikajuhendaja_epost
        }

        let company = await Company.findOneAndUpdate(
            { taotlus: req.params.taotluseId },
            { $set: companyFileds },
            { new: true, upsert: true }
        );
        
        const data = await Company.find({ taotlus: req.params.taotluseId }).populate('taotlus');

        const todaysDate = moment().format('DD.MM.YYYY')

        if (!fs.existsSync(`praktikataotlused/${req.params.taotluseId}`)) {
            fs.mkdirSync(`praktikataotlused/${req.params.taotluseId}`)
        }

        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(`http://localhost:5000/api/pdf/${req.params.taotluseId}`, {waitUntil: 'networkidle0'});
        await page.pdf({path: `praktikataotlused/${req.params.taotluseId}/${data[0].taotlus.opilase_nimi} ${todaysDate}.pdf`, format: 'A4' });
        await browser.close();

        res.status(201).json({"Company": company, "Taotlus": data});
         
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



exports.sendTaotlusIdWithEmail = async (req, res, next) => {
    try {
        const data = await Taotlus.find({ _id: req.params.taotluseId })

        const sendData = {
            nimi: data[0].opilase_nimi,
            id: data[0].id,
            eriala: data[0].eriala
        }

        toEmail = `${req.body.email}`

        const output = `
            <ul>  
                <li>Õpilane ${sendData.nimi}</li>
                <li>${sendData.eriala}</li>
                <li>www.domain.ee/taotlus/${sendData.id}</li>
                <li>Praktika taotluse <a href="www.domain.ee/taotlus/${sendData.id}">LINK</a></li>
            </ul>
        `;

        let transporter = nodemailer.createTransport({
            // service: 'gmail',
            host: config.get('MAIL_HOST'),
            port: 2525,
            auth: {
                user: config.get('MAIL_USER'),
                pass: config.get('MAIL_PASSWOD')
            }
        });
       
        let mailOptions = {
            from: 'praktika@khk.ee', 
            to: toEmail, // list of receivers
            subject: `${sendData.nimi} praktika dokumendi link`, // Subject line
            text: 'Hello world?', // plain text body
            html: output // html body
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
           
            res.status(201).json({
                data: sendData,
                info
            });
        });

    } catch (err) {
        next(err)
    }
}





