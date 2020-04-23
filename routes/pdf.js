const express = require('express');
const router = express.Router();
const Company = require('../models/Company');
const moment = require('moment');

router.get('/5e8a60dcdba07aee528c45ba', async (req, res) => {

    const data = await Company.find({ taotlus: '5e8a60dcdba07aee528c45ba'}).populate('taotlus');
    // res.json(data)

    const applicationData = {
        title: 'Praktikataotlus',
        todayDate: moment().format("DD.MM.YYYY"),
        eriala: data[0].taotlus.eriala,
        op_nimi: data[0].taotlus.opilase_nimi,
        praktika_periood: data[0].taotlus.periood,
        praktika_maht: data[0].taotlus.maht,
        praktikakoha_nimi: data[0].ettevote_nimi,
        praktikakoha_reg: '12312312',
        praktikakoha_telefon: data[0].telefon,
        praktikakoha_epost: data[0].taotlus.ettevote_email,
        praktikakoha_aadress: data[0].aadress,
        praktikakoha_lepingu_solmija: data[0].lepingu_solmija,
        // praktikakoha_lepingu_solmija_aadress: data[0].leping,
        praktikakoha_allkirjastamis_alus: data[0].lepingu_alus,
        praktikajuh_nimi: data[0].juhendaja,
        praktikajuh_amet: 'Töötaja',
        praktikajuh_tel: data[0].juhendaja_telefon,
        tasks: data[0].ulesanded
    }   

      res.render('index', applicationData);
})

module.exports = router;